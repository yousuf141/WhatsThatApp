import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../providers/AuthProvider";

import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { getStorageObject } from "../utils/storage";
import { ActivityIndicator } from "react-native-paper";

const BaseScreen: React.FC = () => {
  const [authState, authDispatch] = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      setIsLoading(true);

      const data = await getStorageObject("auth");
      authDispatch(data);

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignContent: "center" }}
        size="large"
        animating={true}
      />
    );
  }

  return (
    <NavigationContainer>
      {authState.userId == null ? <AuthScreen /> : <HomeScreen />}
    </NavigationContainer>
  );
};

export default BaseScreen;
