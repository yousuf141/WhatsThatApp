import React from "react";

import { type NavigationProp } from "@react-navigation/native";

import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useSnackbar } from "../../hooks/useSnackbar";

import { userService } from "../../services/userService";

import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validators";

import FormInput from "../../components/forms/FormInput";

const SignUpSection: React.FC<{ navigation: NavigationProp<any, any> }> = ({
  navigation,
}) => {
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

  async function handleSignUp(): Promise<void> {
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      snackbar.show("Please make sure all fields are valid.");
    }

    const res = await userService.register({
      firstName,
      lastName,
      email,
      password,
    });
    if (!res.success) {
      if (res.errorCode === 400) {
        snackbar.show("Register failed. Invalid fields.");
      } else {
        snackbar.show("Unknown Error. Please try again.");
      }
      return;
    }

    snackbar.show("Account Created!");
    setTimeout(() => {
      goToLogin();
    }, 1000);
  }

  function handleGoToLogin(): void {
    goToLogin();
  }

  function goToLogin(): void {
    navigation.navigate("LoginSection");
  }

  return (
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
        <Button
          style={{ marginBottom: 10, marginHorizontal: 10 }}
          mode="contained"
          onPress={() => {
            void handleSignUp();
          }}
        >
          Sign Up
        </Button>
        <Button style={{ marginBottom: 20 }} onPress={handleGoToLogin}>
          Login
        </Button>
      </View>
    </View>
  );
};
export default SignUpSection;
