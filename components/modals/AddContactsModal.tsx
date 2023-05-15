import React from "react";
import { FlatList } from "react-native";

import {
  DefaultTheme,
  Divider,
  Modal,
  Portal,
  Searchbar,
} from "react-native-paper";

import { type User } from "../../models/user/user";

import { useAuth } from "../../providers/AuthProvider";

import { useSnackbar } from "../../hooks/useSnackbar";

import { userService } from "../../services/userService";

import Contact from "../contact/Contact";
import Loading from "../Loading";

interface AddContactModalProps {
  visible: boolean;
  hide: () => void;
}

const AddContactsModal: React.FC<AddContactModalProps> = ({
  visible,
  hide,
}) => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [users, setUsers] = React.useState<User[]>([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!visible) setSearchQuery("");
  }, [visible]);

  React.useEffect(() => {
    const x = setTimeout(() => {
      void (async () => {
        setLoading(true);
        const res = await userService.search(searchQuery, auth.key as string);
        if (!res.success) {
          snackbar.show("Error: Failed to get users");
          setLoading(false);
          return;
        }
        setUsers(res.data as User[]);

        setLoading(false);
      })();
    }, 500);

    return () => {
      clearTimeout(x);
    };
  }, [searchQuery]);

  async function handleSearchChange(e: string): Promise<void> {
    setSearchQuery(e);
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
          onChangeText={(e) => {
            void handleSearchChange(e);
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
