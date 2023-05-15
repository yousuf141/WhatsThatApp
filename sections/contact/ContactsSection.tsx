import React from "react";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { Button, Divider, FAB, List, Text } from "react-native-paper";

import { type Contact } from "../../models/contact/contact";

import { useModal } from "../../hooks/useModal";

import AddContactsModal from "../../components/modals/AddContactsModal";
import { contactService } from "../../services/contactService";
import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";
import Loading from "../../components/Loading";

const ContactsSection: React.FC = () => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  const [contacts, setContacts] = React.useState<Contact[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [toggleRefresh, setToggleRefresh] = React.useState(false);

  const addContactsModal = useModal();

  React.useEffect(() => {
    void (async () => {
      setLoading(true);

      const res = await contactService.getAll(auth.key as string);
      if (!res.success) {
        snackbar.show("Error: Failed to get the contacts.");
        setLoading(false);
        return;
      }
      setContacts(res.data as Contact[]);

      setLoading(false);
    })();
  }, [toggleRefresh]);

  function handleRefresh(): void {
    setToggleRefresh((x) => !x);
  }

  function handleAddContacts(): void {
    addContactsModal.show();
  }

  async function handleDeleteContact(userId: number): Promise<void> {
    const res = await contactService.deleteById(userId, auth.key as string);
    if (!res.success) {
      snackbar.show("Failed to delete contact.");
    } else {
      snackbar.show("Successfully deleted the contact!");
    }
    handleRefresh();
  }

  function renderContacts(): JSX.Element {
    if (loading) return <Loading />;

    if (contacts.length === 0) {
      return (
        <Text variant="labelLarge" style={{ padding: 10, textAlign: "center" }}>
          You currently do not have any contacts. Add contacts using the buttons
          below
        </Text>
      );
    }

    return (
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <List.Item
                style={{ flex: 0.75 }}
                title={`${item.firstName} ${item.lastName}`}
                description={item.email}
              />
              <Button
                style={{
                  flex: 0.2,
                  alignSelf: "center",
                }}
                onPress={function () {
                  void handleDeleteContact(item.id);
                }}
              >
                Delete
              </Button>
            </View>
            <Divider />
          </>
        )}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <RefreshControl refreshing={toggleRefresh} onRefresh={handleRefresh} />
        {renderContacts()}
      </ScrollView>
      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 10, right: 10 }}
        onPress={handleAddContacts}
      />
      <AddContactsModal
        visible={addContactsModal.visible}
        hide={addContactsModal.hide}
        refresh={handleRefresh}
      />
    </View>
  );
};
export default ContactsSection;
