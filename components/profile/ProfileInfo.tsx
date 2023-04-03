import React from "react";
import { Divider, List, Text } from "react-native-paper";

import { useAuth } from "../../providers/AuthProvider";

import { useSnackbar } from "../../hooks/useSnackbar";

import { userService } from "../../services/userService";

import { type User } from "../../models/user/user";

import Loading from "../../components/Loading";

const ProfileInfo: React.FC = () => {
  const [auth, authDispatch] = useAuth();
  const snackbar = useSnackbar();

  const [user, setUser] = React.useState<User | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      setIsLoading(true);

      setUser(await getUserInfo());

      setIsLoading(false);
    })();
  }, []);

  async function getUserInfo(): Promise<User | null> {
    const res = await userService.getById(
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
    return res.data as User;
  }

  if (isLoading) return <Loading />;

  if (user == null)
    return <Text>Failed to get user profile. Please try again.</Text>;

  return (
    <List.Section title="Profile Info" titleStyle={{ fontWeight: "bold" }}>
      <List.Item
        title="ID"
        titleStyle={{ fontWeight: "bold" }}
        right={() => <Text>{user.id}</Text>}
      />
      <Divider />
      <List.Item
        title="Full Name"
        titleStyle={{ fontWeight: "bold" }}
        right={() => <Text>{`${user.firstName} ${user.lastName}`}</Text>}
      />
      <Divider />
      <List.Item
        title="Email"
        titleStyle={{ fontWeight: "bold" }}
        right={() => <Text>{user.email}</Text>}
      />
      <Divider />
    </List.Section>
  );
};
export default ProfileInfo;
