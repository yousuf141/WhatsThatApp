import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ContactsSection from "../sections/contact/ContactsSection";
import ContactSection from "../sections/contact/ContactSection";

const Stack = createStackNavigator();

const ContactsScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ContactsSection">
      <Stack.Screen
        options={{ headerTitle: "Contacts" }}
        name="ContactsSection"
        component={ContactsSection}
      />
      <Stack.Screen
        options={{ headerTitle: "Contact" }}
        name="ContactSection"
        component={ContactSection}
      />
    </Stack.Navigator>
  );
};

export default ContactsScreen;
