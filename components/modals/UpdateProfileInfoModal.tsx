import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validators";

import { type User } from "../../models/user/user";

import FormInput from "../forms/FormInput";

interface UpdateProfileInfoModalProps {
  visible: boolean;
  hide: () => void;
  user: User;
}

const UpdateProfileInfoModal: React.FC<UpdateProfileInfoModalProps> = ({
  visible,
  hide,
  user,
}) => {
  const [firstName, setFirstName] = React.useState<string>("");
  const isFirstNameValid = validateName(firstName);

  const [lastName, setLastName] = React.useState<string>("");
  const isLastNameValid = validateName(lastName);

  const [email, setEmail] = React.useState<string>("");
  const isEmailValid = validateEmail(email);

  const [password, setPassword] = React.useState<string>("");
  const isPasswordValid = validatePassword(password);

  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const isConfirmPasswordValid = confirmPassword === password;

  React.useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  }, [visible, user]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hide}
        contentContainerStyle={{
          flex: 0.55,
          margin: 5,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Text variant="titleMedium" style={{ padding: 10, fontWeight: "500" }}>
          Update Profile Info
        </Text>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <FormInput
              label="First Name"
              left={<TextInput.Icon icon={"account"} />}
              value={firstName}
              onChangeText={setFirstName}
              error={!isFirstNameValid && firstName.length > 0}
              errorMessage="Must only contain letters."
            />
            <FormInput
              label="Last Name"
              left={<TextInput.Icon icon={"account"} />}
              value={lastName}
              onChangeText={setLastName}
              error={!isLastNameValid && lastName.length > 0}
              errorMessage="Must only contain letters."
            />
            <FormInput
              label="Email"
              left={<TextInput.Icon icon={"email"} />}
              value={email}
              onChangeText={setEmail}
              error={!isEmailValid && email.length > 0}
              errorMessage="Must be a valid email."
            />
            <FormInput
              label="Password"
              left={<TextInput.Icon icon={"lock"} />}
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              error={!isPasswordValid && password.length > 0}
              errorMessage="Must be longer than 8 chars and contain upper, lower and symbol
            chars."
            />
            <FormInput
              label="Confirm Password"
              left={<TextInput.Icon icon={"lock"} />}
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
              error={!isConfirmPasswordValid && confirmPassword.length > 0}
              errorMessage="Must match password."
            />
          </View>
          <View>
            <Button style={{ margin: 5 }} mode="contained">
              Update
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default UpdateProfileInfoModal;
