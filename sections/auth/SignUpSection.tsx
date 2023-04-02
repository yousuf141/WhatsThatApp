import React from "react";

import { type NavigationProp } from "@react-navigation/native";

import { View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";

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

  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");

  async function handleSignUp(): Promise<void> {
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      showSnackbar("Please make sure all fields are valid.");
    }

    const res = await userService.register({
      firstName,
      lastName,
      email,
      password,
    });
    if (!res.success) {
      if (res.errorCode === 400)
        showSnackbar("Register failed. Invalid fields.");
      else showSnackbar("Unknown Error. Please try again.");
      return;
    }

    showSnackbar("Account Created!", 900);
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

  function showSnackbar(message: string, time: number = 1500): void {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, time);
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
      <Snackbar
        visible={snackbarVisible}
        duration={3000}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default SignUpSection;
