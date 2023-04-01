import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const BaseScreen: React.FC = () => {
  const loggedIn = false;

  return (
    <NavigationContainer>
      {loggedIn === false ? <AuthScreen /> : <HomeScreen />}
    </NavigationContainer>
  );
};

export default BaseScreen;
