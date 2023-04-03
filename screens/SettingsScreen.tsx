import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SettingsSection from "../sections/settings/SettingsSection";

const Stack = createStackNavigator();

const SettingsScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsSection">
      <Stack.Screen
        options={{ headerTitle: "Settings" }}
        name="SettingsSection"
        component={SettingsSection}
      />
    </Stack.Navigator>
  );
};

export default SettingsScreen;
