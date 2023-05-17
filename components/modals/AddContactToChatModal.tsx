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
import { useContactSearch } from "../../hooks/contact/useContactSearch";

import { chatService } from "../../services/chatService";

import Loading from "../Loading";

interface TakePhotoModalProps {
  visible: boolean;
  chatId: number;
  refresh: () => void;
  hide: () => void;
}

const AddContactToChatModal: React.FC<TakePhotoModalProps> = ({
  visible,
  refresh,
  chatId,
  hide,
}) => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  const contactSearch = useContactSearch(visible, auth.key as string);

  async function handleAddContact(contact: Contact): Promise<void> {
    const res = await chatService.addContactToChat(
      chatId,
      contact.id,
      auth.key as string
    );
    if (res.success) {
      snackbar.show("Successfully added the contact!");
      hide();
      refresh();
    } else {
      snackbar.show("Error: Failed to add the contact.");
    }
  }

  function renderContacts(): JSX.Element {
    if (contactSearch.loading) return <Loading />;
    return (
      <View>
        {contactSearch.contacts.map((contact) => {
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
          mode="contained"
          onPress={() => {
            void handleAddContact(contact);
          }}
        >
          Add
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
            Add Contact
          </Text>
          {renderContacts()}
        </View>
      </Modal>
    </Portal>
  );
};
export default AddContactToChatModal;
