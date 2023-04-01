import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginSection from "../sections/auth/LoginSection";
import SignUpSection from "../sections/auth/SignUpSection";

const Stack = createStackNavigator();

const AuthScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginSection">
      <Stack.Screen
        options={{ headerTitle: "Login" }}
        name="LoginSection"
        component={LoginSection}
      />
      <Stack.Screen
        options={{ headerTitle: "Sign Up" }}
        name="SignUpSection"
        component={SignUpSection}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;
