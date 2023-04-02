import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { IconButton } from "react-native-paper";

import ContactsScreen from "./ContactsScreen";
import ChatsScreen from "./ChatsScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="ChatsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: () => <IconButton icon="contacts" />,
        }}
        name="ContactsScreen"
        component={ContactsScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: () => <IconButton icon="chat" />,
        }}
        name="ChatsScreen"
        component={ChatsScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: () => <IconButton icon="cog" />,
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
