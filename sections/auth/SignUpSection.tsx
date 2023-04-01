import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import FormInput from "../../components/forms/FormInput";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validators";

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

  function handleSignUp() {
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      showSnackbar("Please make sure all fields are valid.");
      return;
    }

    // TODO: implement actual sign up
  }

  function handleGoToLogin() {
    navigation.navigate("LoginSection");
  }

  function showSnackbar(message: string, time: number = 1500) {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), time);
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
          onChangeText={setPassword}
          error={!isPasswordValid && password.length > 0}
          errorMessage="Must be longer than 8 chars and contain upper, lower and number
            chars."
        />
        <FormInput
          label="Confirm Password"
          left={<TextInput.Icon icon={"lock"} />}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={!isConfirmPasswordValid && confirmPassword.length > 0}
          errorMessage="Must match password."
        />
      </View>
      <View>
        <Button mode="contained" onPress={handleSignUp}>
          Sign Up
        </Button>
        <Button onPress={handleGoToLogin}>Login</Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        duration={3000}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default SignUpSection;
