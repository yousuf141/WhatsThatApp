import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { useAuth } from "../../providers/AuthProvider";

const ProfileActions: React.FC = () => {
  const [, authDispatch] = useAuth();

  function handleUpdateInfo(): void {
    // TODO: implement updating of users info. another screen needed?
  }

  function handleUpdatePhoto(): void {
    // TODO: see how native image picking can be done using expo
  }

  function handleLogout(): void {
    authDispatch({ userId: undefined, key: undefined });
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
          onPress={handleUpdatePhoto}
        >
          Update Photo
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
    </View>
  );
};
export default ProfileActions;
