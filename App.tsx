import React from "react";
import "react-native-gesture-handler";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import AlertProvider from "./providers/AlertProvider";
import AuthProvider from "./providers/AuthProvider";

import BaseScreen from "./screens/BaseScreen";

const theme = {
  ...DefaultTheme,
};

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <AlertProvider>
        <AuthProvider>
          <BaseScreen />
        </AuthProvider>
      </AlertProvider>
    </PaperProvider>
  );
};

export default App;
