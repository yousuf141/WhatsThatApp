import React from "react";
import { View } from "react-native";

import { type NavigationProp } from "@react-navigation/native";

import { Button, Snackbar, TextInput } from "react-native-paper";

import { validateEmail } from "../../utils/validators";
import FormInput from "../../components/forms/FormInput";

const LoginSection: React.FC<{ navigation: NavigationProp<any, any> }> = ({
  navigation,
}) => {
  const [email, setEmail] = React.useState<string>("");
  const isEmailValid = validateEmail(email);

  const [password, setPassword] = React.useState<string>("");

  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");

  function handleLogin(): void {
    if (!isEmailValid) {
      showSnackbar("Please make sure all fields are valid.");
    }

    // TODO: implement actual login
  }

  function handleGoToSignUp(): void {
    navigation.navigate("SignUpSection");
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
          label="Email"
          left={<TextInput.Icon icon={"email"} />}
          value={email}
          onChangeText={setEmail}
          error={!isEmailValid && email.length > 0}
          errorMessage="Must be a valid email."
        />
        <View>
          <FormInput
            label="Password"
            left={<TextInput.Icon icon={"lock"} />}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
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

export default LoginSection;
