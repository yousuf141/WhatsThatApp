import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { useAuth } from "../../providers/AuthProvider";

const ProfileActions: React.FC = () => {
  const [, authDispatch] = useAuth();

  function handleLogout(): void {
    authDispatch({ userId: undefined, key: undefined });
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <Button style={{ margin: 5 }} mode="contained">
          Update Info
        </Button>
        <Button style={{ margin: 5 }} mode="outlined">
          Update Photo
        </Button>
      </View>
      <View>
        <Button
          style={{ margin: 5 }}
          onPress={handleLogout}
          mode="contained-tonal"
        >
          Log Out
        </Button>
      </View>
    </View>
  );
};
export default ProfileActions;
