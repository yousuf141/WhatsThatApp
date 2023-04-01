import React from "react";
import { View } from "react-native";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const BaseScreen: React.FC = () => {
  const loggedIn = false;

  return <View>{loggedIn === false ? <AuthScreen /> : <HomeScreen />}</View>;
};

export default BaseScreen;
