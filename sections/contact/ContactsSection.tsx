import React from "react";
import { View } from "react-native";
import { FAB } from "react-native-paper";

import { useModal } from "../../hooks/useModal";

import AddContactsModal from "../../components/modals/AddContactsModal";

const ContactsSection: React.FC = () => {
  const addContactsModal = useModal();

  function handleAddContacts(): void {
    addContactsModal.show();
  }

  return (
    <View style={{ flex: 1 }}>
      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 10, right: 10 }}
        onPress={handleAddContacts}
      />
      <AddContactsModal
        visible={addContactsModal.visible}
        hide={addContactsModal.hide}
      />
    </View>
  );
};
export default ContactsSection;
