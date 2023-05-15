import React from "react";
import { Dimensions, View } from "react-native";
import { Button, DefaultTheme, Modal, Portal, Text } from "react-native-paper";
import { Camera, CameraType, PermissionStatus } from "expo-camera";

interface TakePhotoModalProps {
  visible: boolean;
  hide: () => void;
  updatePhoto: (uri: string) => void;
}

const TakePhotoModal: React.FC<TakePhotoModalProps> = ({
  visible,
  hide,
  updatePhoto,
}) => {
  const [type, setType] = React.useState(CameraType.front);
  const [hasPermission, setHasPermission] = React.useState(true);

  const cameraRef = React.useRef<Camera | null>(null);

  React.useEffect(() => {
    void (async () => {
      const res = await Camera.requestCameraPermissionsAsync();
      setHasPermission(res.status === PermissionStatus.GRANTED);
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View>
        <Text>Please Allow Camera Access.</Text>
      </View>
    );
  }

  function calculateShorterWindowLength(): number {
    const dimensions = Dimensions.get("window");
    if (dimensions.height < dimensions.width) return dimensions.height;
    else return dimensions.width;
  }

  function handleFlipCamera(): void {
    if (type === CameraType.front) {
      setType(CameraType.back);
    } else {
      setType(CameraType.front);
    }
  }

  async function handleTakePicture(): Promise<void> {
    if (cameraRef == null || cameraRef.current == null) return;

    const res = await cameraRef.current.takePictureAsync();
    updatePhoto(res.uri);
    hide();
  }

  const shorterWindowLength: number = calculateShorterWindowLength();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hide}
        contentContainerStyle={{
          backgroundColor: DefaultTheme.colors.background,
          alignSelf: "center",
          padding: 5,
          borderRadius: 10,
          width: shorterWindowLength * 0.9,
          height: shorterWindowLength * 0.9,
        }}
      >
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef} />
        <View>
          <Button
            style={{ marginTop: 5 }}
            mode="contained-tonal"
            onPress={handleFlipCamera}
          >
            Flip Camera
          </Button>
          <Button
            style={{ marginTop: 5 }}
            mode="contained"
            onPress={() => {
              void handleTakePicture();
            }}
          >
            Take Picture
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
export default TakePhotoModal;
