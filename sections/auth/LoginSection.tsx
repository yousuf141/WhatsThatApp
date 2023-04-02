import React from "react";
import { View } from "react-native";

import { type NavigationProp } from "@react-navigation/native";

import { Button, Snackbar, TextInput } from "react-native-paper";

import { useAuth } from "../../providers/AuthProvider";

import { userService } from "../../services/userService";

import { validateEmail } from "../../utils/validators";
import FormInput from "../../components/forms/FormInput";

const LoginSection: React.FC<{ navigation: NavigationProp<any, any> }> = ({
  navigation,
}) => {
  const [, authDispatch] = useAuth();

  const [email, setEmail] = React.useState<string>("");
  const isEmailValid = validateEmail(email);

  const [password, setPassword] = React.useState<string>("");

  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");

  async function handleLogin(): Promise<void> {
    if (!isEmailValid) {
      showSnackbar("Please make sure all fields are valid.");
    }

    const res = await userService.login(email, password);
    if (!res.success) {
      if (res.errorCode === 400) showSnackbar("Invalid username/Password.");
      else showSnackbar("Unknown Error. Please try again.");
      return;
    }

    authDispatch({ userId: res.data.user_id, key: res.data.session_token });
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
        <Button
          style={{ marginBottom: 10, marginHorizontal: 10 }}
          mode="contained"
          onPress={() => {
            void handleLogin();
          }}
        >
          Log In
        </Button>
        <Button style={{ marginBottom: 20 }} onPress={handleGoToSignUp}>
          Sign Up
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

export default LoginSection;
