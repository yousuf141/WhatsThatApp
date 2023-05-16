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

// import { contactService } from "../../services/contactService";

import Loading from "../../components/Loading";

const ContactsSection: React.FC = () => {
  const [auth] = useAuth();
  const snackbar = useSnackbar();

  // user search
  const [query, setQuery] = React.useState("");
  const [searchIn, setSearchIn] = React.useState<"all" | "contacts">("all");
  const [limit, setLimit] = React.useState(5);
  const [offset, setOffset] = React.useState(0);

  const [timedQuery, setTimedQuery] = React.useState("");
  const queryTimeRef = React.useRef<NodeJS.Timeout | null>(null);

  const { loading, error, errorMessage, users, hasMore } = useUserSearch(
    { query, searchIn, limit, offset },
    auth.key as string
  );

  React.useEffect(() => {
    if (error) snackbar.show(`Error: ${errorMessage}`);
  }, [errorMessage]);

  React.useEffect(() => {
    if (queryTimeRef.current != null) clearTimeout(queryTimeRef.current);
    queryTimeRef.current = setTimeout(() => {
      console.log(timedQuery);
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

  function renderUsers(): JSX.Element {
    if (loading) return <Loading />;

    if (users.length < 1 && offset === 0) {
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
          data={users}
          renderItem={({ item }) => {
            return (
              <>
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
              </>
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
            disabled={!hasMore}
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
    return <Button mode="contained">Add</Button>;
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
