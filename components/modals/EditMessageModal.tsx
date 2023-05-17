import React from "react";
import { View } from "react-native";
import {
  Button,
  DefaultTheme,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import { type Message } from "../../models/chat/message";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";

import { chatService } from "../../services/chatService";

interface EditMessageModalProps {
  visible: boolean;
  chatId: number;
  message: Message;
  hide: () => void;
  refresh: () => void;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({
  visible,
  chatId,
  message,
  hide,
  refresh,
}) => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  const [newMessage, setNewMessage] = React.useState("");

  React.useLayoutEffect(() => {
    if (visible) setNewMessage("");
  }, [visible]);

  async function handleSaveMessage(): Promise<void> {
    const res = await chatService.updateMessage(
      chatId,
      message.id,
      newMessage,
      auth.key as string
    );
    if (res.success) {
      snackbar.show("Successfully updated the message!");
      hide();
      refresh();
    } else {
      snackbar.show("Error: Failed to update the message.");
    }
  }

  async function handleDeleteMessage(): Promise<void> {
    const res = await chatService.deleteMessageById(
      chatId,
      message.id,
      auth.key as string
    );
    if (res.success) {
      snackbar.show("Successfully delete the message!");
      hide();
      refresh();
    } else {
      snackbar.show("Error: Failed to update the message.");
    }
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hide}
        contentContainerStyle={{
          backgroundColor: DefaultTheme.colors.background,
          margin: 5,
          borderRadius: 10,
        }}
      >
        <View>
          <Text
            variant="titleMedium"
            style={{ padding: 10, fontWeight: "500" }}
          >
            Edit Message
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="Updated Message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
        </View>
        <View>
          <Button
            style={{ margin: 5 }}
            mode="contained"
            onPress={() => {
              void handleSaveMessage();
            }}
          >
            Update
          </Button>
          <Button
            style={{ margin: 5 }}
            mode="outlined"
            onPress={() => {
              void handleDeleteMessage();
            }}
          >
            Delete
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
export default EditMessageModal;
