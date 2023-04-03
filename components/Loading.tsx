import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loading: React.FC = () => {
  return (
    <ActivityIndicator
      style={{ flex: 1, alignContent: "center" }}
      size="large"
      animating={true}
    />
  );
};
export default Loading;
