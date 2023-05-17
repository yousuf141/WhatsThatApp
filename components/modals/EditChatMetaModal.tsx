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

import { type ChatMetadata } from "../../models/chat/ChatMetadata";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";

import { chatService } from "../../services/chatService";

interface EditChatMetaModalProps {
  visible: boolean;
  chatToEdit: ChatMetadata;
  hide: () => void;
  refresh: () => void;
}

const EditChatMetaModal: React.FC<EditChatMetaModalProps> = ({
  visible,
  chatToEdit,
  hide,
  refresh,
}) => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  const [newName, setNewName] = React.useState("");

  React.useLayoutEffect(() => {
    if (visible) setNewName("");
  }, [visible]);

  async function handleSaveChanges(): Promise<void> {
    if (newName.length === 0) {
      snackbar.show("Error: Invalid name for a chat");
      return;
    }

    const res = await chatService.updateChat(
      newName,
      chatToEdit.id,
      auth.key as string
    );
    if (res.success) {
      snackbar.show("Successfully updated the chat!");
      hide();
      refresh();
    } else {
      snackbar.show("Error: Failed to update the chat.");
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
            Edit Chat
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="Chat Name"
            value={newName}
            onChangeText={setNewName}
          />
        </View>
        <View>
          <Button
            style={{ margin: 5 }}
            mode="contained"
            onPress={() => {
              void handleSaveChanges();
            }}
          >
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
export default EditChatMetaModal;
