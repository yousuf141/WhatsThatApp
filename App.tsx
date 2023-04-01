import React from "react";

import { Provider as PaperProvider } from "react-native-paper";

import BaseScreen from "./screens/BaseScreen";

import "react-native-gesture-handler";

const App: React.FC = () => {
  return (
    <PaperProvider>
      <BaseScreen />
    </PaperProvider>
  );
};

export default App;
