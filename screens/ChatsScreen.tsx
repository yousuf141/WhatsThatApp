import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ChatsSection from "../sections/chat/ChatsSection";
import ChatSection from "../sections/chat/ChatSection";

const Stack = createStackNavigator();

const ChatsScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ChatsSection">
      <Stack.Screen
        options={{ headerTitle: "Chats" }}
        name="ChatsSection"
        component={ChatsSection}
      />
      <Stack.Screen
        options={{ headerTitle: "Chat" }}
        name="ChatSection"
        component={ChatSection}
      />
    </Stack.Navigator>
  );
};

export default ChatsScreen;
