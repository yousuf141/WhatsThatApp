import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const LoginSection: React.FC<{ navigation: any }> = ({ navigation }) => {
  function handleGoToSignUp() {
    navigation.navigate("SignUpSection");
  }

  return (
    <View>
      <Button onPress={handleGoToSignUp}>Go to Sign Up</Button>
    </View>
  );
};

export default LoginSection;
