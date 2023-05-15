import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";

import { useAuth } from "../../providers/AuthProvider";

import { useModal } from "../../hooks/useModal";
import { useSnackbar } from "../../hooks/useSnackbar";

import { userService } from "../../services/userService";
import { uriToBlob } from "../../utils/files";
import TakePhotoModal from "../modals/TakePhotoModal";

interface ProfileActionsProps {
  onEdit: () => void;
  refresh: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onEdit, refresh }) => {
  const [auth, authDispatch] = useAuth();
  const snackbar = useSnackbar();

  const takePhotoModal = useModal();

  function handleUpdateInfo(): void {
    onEdit();
  }

  async function handleUploadPhoto(): Promise<void> {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;
    if (uri == null) {
      snackbar.show("Error: Invalid file.");
      return;
    }

    const fileType = getFileTypeFromUri(uri);
    if (fileType == null) {
      snackbar.show("Error: Invalid file type.");
      return;
    }

    const fileBlob = await uriToBlob(uri);

    const res = await userService.uploadPhotoById(
      auth.userId as number,
      fileBlob,
      fileType,
      auth.key as string
    );
    if (!res.success) {
      switch (res.errorCode) {
        case 400:
          snackbar.show("Error: Invalid file.");
          break;
        case 401:
          handleLogout();
          break;
        case 403:
          snackbar.show("Error: You do not have permission to upload.");
          break;
        case 404:
          snackbar.show("Error: The user was not found.");
          break;
        default:
          snackbar.show("Error: Unknown Error.");
      }
      return;
    }
    snackbar.show("Successfully updated your profile photo!");
    refresh();
  }

  function handleTakePhoto(): void {
    takePhotoModal.show();
  }

  async function handleModalUpload(uri: string): Promise<void> {
    const fileType = getFileTypeFromUri(uri);
    if (fileType == null) {
      snackbar.show("Error: Invalid file type.");
      return;
    }

    const fileBlob = await uriToBlob(uri);

    const res = await userService.uploadPhotoById(
      auth.userId as number,
      fileBlob,
      fileType,
      auth.key as string
    );
    if (!res.success) {
      switch (res.errorCode) {
        case 400:
          snackbar.show("Error: Invalid file.");
          break;
        case 401:
          handleLogout();
          break;
        case 403:
          snackbar.show("Error: You do not have permission to upload.");
          break;
        case 404:
          snackbar.show("Error: The user was not found.");
          break;
        default:
          snackbar.show("Error: Unknown Error.");
      }
      return;
    }
    snackbar.show("Successfully updated your profile photo!");
    refresh();
  }

  function handleLogout(): void {
    authDispatch({ userId: undefined, key: undefined });
  }

  function getFileTypeFromUri(uri: string): string | null {
    let data: string = "";

    if (uri.startsWith("data")) {
      // filter for web
      data = uri.split(";")[0];

      const fileType: string = data.split("data:")[1] ?? null;
      switch (fileType) {
        case "image/png":
        case "image/jpg":
        case "image/jpeg":
          return fileType;
        default:
          return null;
      }
    } else if (uri.startsWith("file")) {
      // filter for mobile
      const fileType = uri.substring(uri.lastIndexOf(".") + 1);

      switch (fileType) {
        case "png":
          return "image/png";
        case "jpg":
          return "image/jpg";
        case "jpeg":
          return "image/jpeg";
        default:
          return null;
      }
    }
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <Button
          style={{ margin: 5 }}
          mode="contained"
          onPress={handleUpdateInfo}
        >
          Update Info
        </Button>
        <Button
          style={{ margin: 5 }}
          mode="outlined"
          onPress={() => {
            void handleUploadPhoto();
          }}
        >
          Upload Photo
        </Button>
        <Button style={{ margin: 5 }} mode="outlined" onPress={handleTakePhoto}>
          Take a Photo
        </Button>
      </View>
      <View>
        <Button
          style={{ margin: 5 }}
          mode="contained-tonal"
          onPress={handleLogout}
        >
          Log Out
        </Button>
      </View>
      <TakePhotoModal
        visible={takePhotoModal.visible}
        hide={takePhotoModal.hide}
        updatePhoto={(uri) => {
          void handleModalUpload(uri);
        }}
      />
    </View>
  );
};
export default ProfileActions;
