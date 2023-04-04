import React from "react";

import { type User } from "../../models/user/user";

import { List } from "react-native-paper";

interface ContactProps {
  user: User;
}

const Contact: React.FC<ContactProps> = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <List.Item
      title={fullName}
      description={user.email}
      //   left={(props) => <List.Icon {...props} icon={{}} />}
    />
  );
};
export default Contact;
