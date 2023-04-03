import React from "react";
import "react-native-gesture-handler";

import { Provider as PaperProvider } from "react-native-paper";

import AuthProvider from "./providers/AuthProvider";

import BaseScreen from "./screens/BaseScreen";

const App: React.FC = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <BaseScreen />
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
