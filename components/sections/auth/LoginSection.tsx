import React from "react";
import { View } from "react-native";

import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";

import { validateEmail, validatePassword } from "../../../utils/validators";

const LoginSection: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = React.useState<string>("");
  const isEmailValid = validateEmail(email);

  const [password, setPassword] = React.useState<string>("");
  const isPasswordValid = validatePassword(password);

  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");

  function handleLogin() {
    if (!isEmailValid || !isPasswordValid) {
      showSnackbar("Please make sure all fields are valid.");
      return;
    }

    // TODO: implement actual login
  }

  function handleGoToSignUp() {
    navigation.navigate("SignUpSection");
  }

  function showSnackbar(message: string, time: number = 1500) {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), time);
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <View>
          <TextInput
            label="Email"
            left={<TextInput.Icon icon={"email"} />}
            value={email}
            onChangeText={setEmail}
            error={!isEmailValid && email.length > 0}
          />
          <HelperText type="error" visible={!isEmailValid && email.length > 0}>
            Email is invalid
          </HelperText>
        </View>
        <View>
          <TextInput
            label="Password"
            left={<TextInput.Icon icon={"lock"} />}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            error={!isPasswordValid && password.length > 0}
          />
          <HelperText
            type="error"
            visible={!isPasswordValid && password.length > 0}
          >
            Password is invalid
          </HelperText>
        </View>
      </View>
      <View>
        <Button mode="contained" onPress={handleLogin}>
          Log In
        </Button>
        <Button onPress={handleGoToSignUp}>Sign Up</Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default LoginSection;
