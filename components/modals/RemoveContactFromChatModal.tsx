import React from "react";
import { View } from "react-native";
import {
  Button,
  DefaultTheme,
  Divider,
  List,
  Modal,
  Portal,
  Text,
} from "react-native-paper";

import { type Contact } from "../../models/contact/contact";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";

import { chatService } from "../../services/chatService";

interface RemoveContactFromChatModalProps {
  visible: boolean;
  chatId: number;
  contacts: Contact[];
  refresh: () => void;
  hide: () => void;
}

const RemoveContactFromChatModal: React.FC<RemoveContactFromChatModalProps> = ({
  visible,
  refresh,
  chatId,
  contacts,
  hide,
}) => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  async function handleRemoveContact(contact: Contact): Promise<void> {
    const res = await chatService.removeContactFromChat(
      chatId,
      contact.id,
      auth.key as string
    );
    if (res.success) {
      snackbar.show("Successfully removed the contact!");
      hide();
      refresh();
    } else {
      snackbar.show("Error: Failed to remove the contact.");
    }
  }

  function renderContacts(): JSX.Element {
    return (
      <View>
        {contacts.map((contact) => {
          if (contact.id === auth.userId) return null;
          return (
            <View key={contact.id}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <List.Item
                  title={`${contact.firstName} ${contact.lastName}`}
                  titleStyle={{ fontWeight: "bold" }}
                  description={contact.email}
                />
                <View
                  style={{
                    alignSelf: "center",
                    padding: 10,
                  }}
                >
                  {renderContactActions(contact)}
                </View>
              </View>
              <Divider />
            </View>
          );
        })}
      </View>
    );
  }

  function renderContactActions(contact: Contact): JSX.Element {
    return (
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Button
          mode="contained-tonal"
          onPress={() => {
            void handleRemoveContact(contact);
          }}
        >
          Remove
        </Button>
      </View>
    );
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
            Edit Contacts
          </Text>
          {renderContacts()}
        </View>
      </Modal>
    </Portal>
  );
};
export default RemoveContactFromChatModal;
