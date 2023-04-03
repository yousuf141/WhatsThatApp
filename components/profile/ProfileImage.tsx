import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { useAuth } from "../../providers/AuthProvider";

import { useSnackbar } from "../../hooks/useSnackbar";

import { userService } from "../../services/userService";

import Loading from "../../components/Loading";
import { blobToBase64 } from "../../utils/files";

const ProfileImage: React.FC = () => {
  const [auth, authDispatch] = useAuth();
  const snackbar = useSnackbar();

  const [imageUri, setImageUri] = React.useState<string | ArrayBuffer | null>(
    null
  );

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      setIsLoading(true);

      setImageUri(await getUserImage());

      setIsLoading(false);
    })();
  }, []);

  async function getUserImage(): Promise<string | ArrayBuffer | null> {
    const res = await userService.getPhotoById(
      auth.userId as number,
      auth.key as string
    );
    if (!res.success) {
      switch (res.errorCode) {
        case 401:
          authDispatch({ userId: undefined, key: undefined });
          break;
        case 404:
          snackbar.show("Error: could not find profile.");
          break;
        default:
          snackbar.show("Unknown Error");
      }
      return null;
    }
    const imageBlob = res.data as Blob;
    return await blobToBase64(imageBlob);
  }

  if (isLoading) return <Loading />;

  if (imageUri == null)
    return <Text>Failed to get user image. Please try again.</Text>;

  return (
    <View style={{ display: "flex", alignSelf: "center", margin: 10 }}>
      <Avatar.Image source={{ uri: imageUri as string }} size={200} />
    </View>
  );
};
export default ProfileImage;
