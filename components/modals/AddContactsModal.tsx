import React from "react";

import {
  DefaultTheme,
  Divider,
  Modal,
  Portal,
  Searchbar,
} from "react-native-paper";

import { type User } from "../../models/user/user";

import Loading from "../Loading";
import { FlatList } from "react-native-gesture-handler";
import Contact from "../contact/Contact";

interface AddContactModalProps {
  visible: boolean;
  hide: () => void;
}

const AddContactsModal: React.FC<AddContactModalProps> = ({
  visible,
  hide,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [users, setUsers] = React.useState<User[]>([
    { id: 1, firstName: "a", lastName: "b", email: "a@e" },
    { id: 2, firstName: "b", lastName: "c", email: "b@c" },
    { id: 3, firstName: "b", lastName: "c", email: "b@c" },
    { id: 4, firstName: "b", lastName: "c", email: "b@c" },
    { id: 5, firstName: "b", lastName: "c", email: "b@c" },
    { id: 6, firstName: "b", lastName: "c", email: "b@c" },
    { id: 7, firstName: "b", lastName: "c", email: "b@c" },
    { id: 8, firstName: "b", lastName: "c", email: "b@c" },
    { id: 9, firstName: "b", lastName: "c", email: "b@c" },
    { id: 10, firstName: "b", lastName: "c", email: "b@c" },
    { id: 11, firstName: "b", lastName: "c", email: "b@c" },
    { id: 12, firstName: "b", lastName: "c", email: "b@c" },
    { id: 13, firstName: "b", lastName: "c", email: "b@c" },
    { id: 14, firstName: "b", lastName: "c", email: "b@c" },
    { id: 15, firstName: "b", lastName: "c", email: "b@c" },
    { id: 16, firstName: "b", lastName: "c", email: "b@c" },
  ]);

  const [loading, setLoading] = React.useState(false);

  async function handleSearchChange(): Promise<void> {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  function renderUsers(): React.ReactNode {
    if (loading) return <Loading />;

    return (
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <>
              <Contact user={item} />
              <Divider />
            </>
          );
        }}
      />
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
          paddingTop: 5,
          borderRadius: 10,
          maxHeight: 400,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={() => {
            void handleSearchChange();
          }}
          autoFocus={true}
          value={searchQuery}
        />
        {renderUsers()}
      </Modal>
    </Portal>
  );
};
export default AddContactsModal;
