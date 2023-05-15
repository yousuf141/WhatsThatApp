import React from "react";
import { FlatList, View } from "react-native";

import {
  Button,
  DefaultTheme,
  Divider,
  List,
  Modal,
  Portal,
  Searchbar,
} from "react-native-paper";

import { type User } from "../../models/user/user";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";

import { userService } from "../../services/userService";
import { contactService } from "../../services/contactService";

import Loading from "../Loading";

interface AddContactModalProps {
  visible: boolean;
  hide: () => void;
  refresh: () => void;
}

const AddContactsModal: React.FC<AddContactModalProps> = ({
  visible,
  hide,
  refresh,
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
        const res = await userService.search(
          searchQuery,
          {},
          auth.key as string
        );
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

  async function handleAddContact(user: User): Promise<void> {
    const res = await contactService.addById(user.id, auth.key as string);
    if (!res.success) {
      snackbar.show("Failed to add the user to your contact");
    } else {
      snackbar.show("Add user to your contacts!");
    }
    hide();
    refresh();
  }

  function renderUsers(): React.ReactNode {
    if (loading) return <Loading />;

    return (
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <>
              {item.id === auth.userId ? ( // dont render self
                <></>
              ) : (
                <>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <List.Item
                      style={{ flex: 0.75 }}
                      title={`${item.firstName} ${item.lastName}`}
                      description={item.email}
                    />
                    <Button
                      style={{ flex: 0.2, alignSelf: "center" }}
                      onPress={function () {
                        void handleAddContact(item);
                      }}
                    >
                      Add
                    </Button>
                  </View>
                  <Divider />
                </>
              )}
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
