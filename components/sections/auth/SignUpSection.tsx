import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const SignUpSection: React.FC<{ navigation: any }> = ({ navigation }) => {
  function handleGoToLogin() {
    navigation.navigate("LoginSection");
  }

  return (
    <View>
      <Button onPress={handleGoToLogin}>Go to Login</Button>
    </View>
  );
};

export default SignUpSection;
