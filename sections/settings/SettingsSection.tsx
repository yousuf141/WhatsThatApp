import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Card, Snackbar, Text } from "react-native-paper";

import { useAuth } from "../../providers/AuthProvider";

import { userService } from "../../services/userService";

import { type User } from "../../models/user/user";

const SettingsSection: React.FC = () => {
  const [authState] = useAuth();

  const [user, setUser] = React.useState<User | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");

  React.useEffect(() => {
    void (async () => {
      setIsLoading(true);

      const res = await userService.getById(
        authState.userId as number,
        authState.key as string
      );

      if (!res.success) {
        let snackbarMessage: string = "";

        switch (res.errorCode) {
          case 401:
            snackbarMessage = "Unauthorized";
            break;
          case 404:
            snackbarMessage = "Not Found";
            break;
          default:
            snackbarMessage = "Unknown Error";
        }

        showSnackbar(snackbarMessage);
        setIsLoading(false);
        return;
      }

      setUser(res.data as User);
      setIsLoading(false);
    })();
  }, []);

  function renderProfile(): React.ReactNode {
    if (isLoading) {
      return (
        <ActivityIndicator
          style={{ flex: 1, alignContent: "center" }}
          size="large"
          animating={true}
        />
      );
    }

    if (user === null) return <></>;

    const fullName: string = `${user.firstName} ${user?.lastName}`;

    return (
      <>
        <Card.Title title={fullName} />
        <Card.Content>
          <Text>Email: {user.email}</Text>
        </Card.Content>
      </>
    );
  }

  function showSnackbar(message: string, time: number = 1500): void {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, time);
  }

  return (
    <View>
      <Card>{renderProfile()}</Card>
      <Snackbar
        visible={snackbarVisible}
        duration={3000}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};
export default SettingsSection;
