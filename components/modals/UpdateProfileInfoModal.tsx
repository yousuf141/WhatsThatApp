import React from "react";
import { View } from "react-native";
import {
  Button,
  DefaultTheme,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validators";

import { userService } from "../../services/userService";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../../hooks/useSnackbar";

import { type User } from "../../models/user/user";

import FormInput from "../forms/FormInput";

interface UpdateProfileInfoModalProps {
  visible: boolean;
  hide: () => void;
  refresh: () => void;
  user: User;
}

const UpdateProfileInfoModal: React.FC<UpdateProfileInfoModalProps> = ({
  visible,
  hide,
  refresh,
  user,
}) => {
  const [auth, authDispatch] = useAuth();
  const snackbar = useSnackbar();

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

  async function handleUpdateProfileInfo(): Promise<void> {
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      (!isPasswordValid && password.length > 0) ||
      !isConfirmPasswordValid
    ) {
      snackbar.show("Please make sure all fields are valid.");
    }

    const res = await userService.update(
      {
        id: user.id,
        firstName,
        lastName,
        email,
      },
      password,
      auth.key as string
    );
    if (!res.success) {
      switch (res.errorCode) {
        case 400:
          snackbar.show("Error: Invalid information");
          return;
        case 401:
          authDispatch({ key: undefined, userId: undefined });
          return;
        case 403:
          snackbar.show("Error: Unauthorised");
          return;
        case 404:
          snackbar.show("Error: User not found");
          return;
        default:
          snackbar.show("Error: Unknown Error");
          return;
      }
    }

    snackbar.show("Successfully update the user info!");
    hide();
    refresh();
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hide}
        contentContainerStyle={{
          margin: 5,
          backgroundColor: DefaultTheme.colors.background,
          borderRadius: 10,
        }}
      >
        <View>
          <Text
            variant="titleMedium"
            style={{ padding: 10, fontWeight: "500" }}
          >
            Update Profile Info
          </Text>
          <View>
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
              <Text>
                Leave blank if you do not want to change your password
              </Text>
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
              <Button
                style={{ margin: 5 }}
                mode="contained"
                onPress={() => {
                  void handleUpdateProfileInfo();
                }}
              >
                Update
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default UpdateProfileInfoModal;
