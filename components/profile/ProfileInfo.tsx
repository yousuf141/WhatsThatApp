import React from "react";
import { Divider, List, Text } from "react-native-paper";

import { type User } from "../../models/user/user";

import Loading from "../../components/Loading";

interface ProfileInfoProps {
  user: User | null;
  loading: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, loading }) => {
  if (loading) return <Loading />;

  if (user == null)
    return <Text>Failed to get user profile. Please try again.</Text>;

  return (
    <List.Section title="Profile Info" titleStyle={{ fontWeight: "bold" }}>
      <List.Item
        title="ID"
        titleStyle={{ fontWeight: "bold" }}
        right={() => <Text>{user.id}</Text>}
      />
      <Divider />
      <List.Item
        title="Full Name"
        titleStyle={{ fontWeight: "bold" }}
        right={() => <Text>{`${user.firstName} ${user.lastName}`}</Text>}
      />
      <Divider />
      <List.Item
        title="Email"
        titleStyle={{ fontWeight: "bold" }}
        right={() => <Text>{user.email}</Text>}
      />
      <Divider />
    </List.Section>
  );
};
export default ProfileInfo;
