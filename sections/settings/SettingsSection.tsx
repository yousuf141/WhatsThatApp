import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Card, Snackbar, Text } from "react-native-paper";

import { useAuth } from "../../providers/AuthProvider";

import { userService } from "../../services/userService";

import { type User } from "../../models/user/user";

const SettingsSection: React.FC = () => {
  const [authState] = useAuth();

  const [profile, setProfile] = React.useState<Partial<User>>({});

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
        if (res.errorCode === 401) {
          showSnackbar("Unauthorized");
        } else if (res.errorCode === 404) {
          showSnackbar("Not found");
        } else {
          showSnackbar("Unknown Error");
        }
      } else {
        setProfile({
          id: res.data.user_id,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
        });
      }

      setIsLoading(false);
    })();
  }, []);

  function renderProfile(): React.ReactNode {
    let profileElement: React.ReactNode = null;

    if (isLoading) {
      profileElement = (
        <ActivityIndicator
          style={{ flex: 1, alignContent: "center" }}
          size="large"
          animating={true}
        />
      );
    } else {
      const fullName: string = `${profile?.firstName ?? ""} ${
        profile?.lastName ?? ""
      }`;

      profileElement = (
        <>
          <Card.Title title={fullName} />
          <Card.Content>
            <Text>Email: {profile?.email ?? ""}</Text>
          </Card.Content>
        </>
      );
    }

    return <Card>{profileElement}</Card>;
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
      {renderProfile()}
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
