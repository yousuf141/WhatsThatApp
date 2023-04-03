import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { type NavigationProp } from "@react-navigation/native";

import { useAuth } from "../../providers/AuthProvider";

import { userService } from "../../services/userService";

import { validateEmail } from "../../utils/validators";

import FormInput from "../../components/forms/FormInput";
import { useSnackbar } from "../../hooks/useSnackbar";

const LoginSection: React.FC<{ navigation: NavigationProp<any, any> }> = ({
  navigation,
}) => {
  const [, authDispatch] = useAuth();
  const snackbar = useSnackbar();

  const [email, setEmail] = React.useState<string>("");
  const isEmailValid = validateEmail(email);

  const [password, setPassword] = React.useState<string>("");

  async function handleLogin(): Promise<void> {
    if (!isEmailValid) {
      snackbar.show("Please make sure all fields are valid.");
    }

    const res = await userService.login(email, password);
    if (!res.success) {
      if (res.errorCode === 400) {
        snackbar.show("Invalid username/Password.");
      } else {
        snackbar.show("Unknown Error. Please try again.");
      }
      return;
    }

    authDispatch({ userId: res.data.userId, key: res.data.key });
  }

  function handleGoToSignUp(): void {
    navigation.navigate("SignUpSection");
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
          style={{ margin: 5 }}
          mode="contained"
          onPress={() => {
            void handleLogin();
          }}
        >
          Log In
        </Button>
        <Button style={{ margin: 5 }} onPress={handleGoToSignUp}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default LoginSection;
