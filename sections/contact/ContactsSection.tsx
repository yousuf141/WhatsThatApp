import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
  Button,
  Divider,
  List,
  Searchbar,
  SegmentedButtons,
  Switch,
  Text,
} from "react-native-paper";

import { type User } from "../../models/user/user";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";

import { useUserSearch } from "../../hooks/useUserSearch";
import { useContactSearch } from "../../hooks/contact/useContactSearch";
import { useBlockedSearch } from "../../hooks/contact/useBlockedSearch";

import { contactService } from "../../services/contactService";

import Loading from "../../components/Loading";

const ContactsSection: React.FC = () => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  // ui states
  const [timedQuery, setTimedQuery] = React.useState("");
  const queryTimeRef = React.useRef<NodeJS.Timeout | null>(null);

  // contact states
  const [contactSearchRefresh, setContactSearchRefresh] = React.useState(false);
  const contactSearch = useContactSearch(
    contactSearchRefresh,
    auth.key as string
  );

  // blocked users states
  const [onlyBlocked, setOnlyBlocked] = React.useState(false);

  const [blockedSearchRefresh, setBlockedSearchRefresh] = React.useState(false);
  const blockedSearch = useBlockedSearch(
    blockedSearchRefresh,
    auth.key as string
  );

  // user search states
  const [query, setQuery] = React.useState("");
  const [searchIn, setSearchIn] = React.useState<"all" | "contacts">("all");
  const [limit, setLimit] = React.useState(5);
  const [offset, setOffset] = React.useState(0);

  const userSearch = useUserSearch(
    { query, searchIn, limit, offset },
    auth.key as string
  );

  React.useEffect(() => {
    if (userSearch.error) snackbar.show(`Error: ${userSearch.errorMessage}`);
  }, [userSearch.errorMessage]);

  React.useEffect(() => {
    if (queryTimeRef.current != null) clearTimeout(queryTimeRef.current);
    queryTimeRef.current = setTimeout(() => {
      setQuery(timedQuery);
    }, 500);
  }, [timedQuery]);

  function handlePageBack(): void {
    setOffset((x) => x - 1);
  }

  function handlePageNext(): void {
    setOffset((x) => x + 1);
  }

  function handleContactSwitchChange(newValue: boolean): void {
    setSearchIn(newValue ? "contacts" : "all");
  }

  async function handleAddContact(id: number): Promise<void> {
    const res = await contactService.addById(id, auth.key as string);
    if (!res.success) {
      snackbar.show("Error: Failed to add to contact");
    } else {
      setContactSearchRefresh((x) => !x);
    }
  }

  async function handleRemoveContact(id: number): Promise<void> {
    const res = await contactService.deleteById(id, auth.key as string);
    if (!res.success) {
      snackbar.show("Error: Failed to delete contact");
    } else {
      setContactSearchRefresh((x) => !x);
    }
  }

  async function handleBlockContact(id: number): Promise<void> {
    const res = await contactService.addBlockedById(id, auth.key as string);
    if (!res.success) {
      snackbar.show("Error: Failed to block contact");
    } else {
      setBlockedSearchRefresh((x) => !x);
    }
  }

  async function handleUnblockContact(id: number): Promise<void> {
    const res = await contactService.deleteBlockedById(id, auth.key as string);
    if (!res.success) {
      snackbar.show("Error: Failed to unblock contact");
    } else {
      setBlockedSearchRefresh((x) => !x);
    }
  }

  function renderUsers(): JSX.Element {
    if (userSearch.loading || contactSearch.loading) return <Loading />;

    if (userSearch.users.length < 1 && offset === 0) {
      return (
        <Text style={{ textAlign: "center", margin: 10 }}>
          No users found...
        </Text>
      );
    }

    return (
      <View>
        <FlatList
          style={{ marginVertical: 10 }}
          data={userSearch.users}
          renderItem={({ item }) => {
            if (onlyBlocked) {
              const isBlocked =
                blockedSearch.users.findIndex((x) => x.id === item.id) !== -1;
              if (!isBlocked) return <></>;
            }

            return (
              <View key={item.id}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <List.Item
                    title={`${item.firstName} ${item.lastName}`}
                    titleStyle={{ fontWeight: "bold" }}
                    description={item.email}
                  />
                  <View
                    style={{
                      alignSelf: "center",
                      padding: 10,
                    }}
                  >
                    {renderItemActions(item)}
                  </View>
                </View>
                <Divider />
              </View>
            );
          }}
        />
        <View
          style={{
            marginTop: 10,
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyLarge">Show Only Contacts</Text>
          <Switch
            style={{ alignSelf: "center" }}
            value={searchIn === "contacts"}
            onValueChange={handleContactSwitchChange}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyLarge">Show Only Blocked</Text>
          <Switch
            style={{ alignSelf: "center" }}
            value={onlyBlocked}
            onValueChange={() => {
              setOnlyBlocked((x) => !x);
            }}
          />
        </View>
        <Text variant="labelSmall" style={{ textAlign: "center" }}>
          Current Page: {offset + 1}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Button
            disabled={offset <= 0}
            mode="contained-tonal"
            onPress={handlePageBack}
          >
            Back
          </Button>
          <SegmentedButtons
            density="small"
            style={{ transform: [{ scale: 0.8 }] }}
            value={limit.toString()}
            onValueChange={(val) => {
              setLimit(parseInt(val));
            }}
            buttons={[
              { value: "1", label: "1" },
              { value: "5", label: "5" },
              { value: "10", label: "10" },
            ]}
          />
          <Button
            disabled={!userSearch.hasMore}
            mode="contained-tonal"
            onPress={handlePageNext}
          >
            Next
          </Button>
        </View>
      </View>
    );
  }

  // TODO: update function to either show add or remove if user is contact or not
  function renderItemActions(user: User): JSX.Element {
    if (user.id === auth.userId) return <></>;

    let addOrRemoveButton: JSX.Element = <></>;

    const isContact =
      contactSearch.contacts.findIndex((x) => x.id === user.id) !== -1;

    if (isContact) {
      addOrRemoveButton = (
        <Button
          mode="contained-tonal"
          onPress={() => {
            void handleRemoveContact(user.id);
          }}
        >
          Remove
        </Button>
      );
    } else {
      addOrRemoveButton = (
        <Button
          mode="contained"
          onPress={() => {
            void handleAddContact(user.id);
          }}
        >
          Add
        </Button>
      );
    }

    let blockOrUnblockButton: JSX.Element = <></>;

    if (isContact) {
      const isBlocked =
        blockedSearch.users.findIndex((x) => x.id === user.id) !== -1;

      if (isBlocked) {
        blockOrUnblockButton = (
          <Button
            mode="outlined"
            onPress={() => {
              void handleUnblockContact(user.id);
            }}
          >
            Unblock
          </Button>
        );
      } else {
        blockOrUnblockButton = (
          <Button
            mode="outlined"
            onPress={() => {
              void handleBlockContact(user.id);
            }}
          >
            Block
          </Button>
        );
      }
    }

    return (
      <View style={{ flexDirection: "row", gap: 5 }}>
        {blockOrUnblockButton}
        {addOrRemoveButton}
      </View>
    );
  }

  function renderActions(): JSX.Element {
    return <></>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Searchbar
        placeholder="Search Users"
        value={timedQuery}
        onChangeText={(x) => {
          setTimedQuery(x);
        }}
      />
      <ScrollView>{renderUsers()}</ScrollView>
      <View>{renderActions()}</View>
    </View>
  );
};
export default ContactsSection;
