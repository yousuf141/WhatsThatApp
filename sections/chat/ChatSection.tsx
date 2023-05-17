import React from "react";
import { View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

import { type RouteProp } from "@react-navigation/native";

import { type ChatMetadata } from "../../models/chat/chat-metadata";

interface ChatSectionProps {
  route: RouteProp<{ params: { chatMeta: ChatMetadata } }>;
}

const ChatSection: React.FC<ChatSectionProps> = ({ route }) => {
  const chatMetaId: number = route.params.chatMeta.id;
  const chatMetaName: string = route.params.chatMeta.name;

  function renderHeader(): JSX.Element {
    return (
      <View>
        <Text
          style={{ fontWeight: "bold", marginVertical: 10 }}
          variant="headlineSmall"
        >
          {chatMetaName}
        </Text>
        <Divider />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View></View>
          <View style={{ flexDirection: "row" }}>
            <Button mode="contained-tonal" style={{ alignSelf: "center" }}>
              View/Edit
            </Button>
            <Button mode="contained" style={{ alignSelf: "center" }}>
              Add
            </Button>
          </View>
        </View>
        <Divider />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      <Text>Chat ID: {chatMetaId}</Text>
    </View>
  );
};
export default ChatSection;
