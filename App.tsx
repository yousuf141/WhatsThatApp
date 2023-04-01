import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import BaseScreen from "./components/screens/BaseScreen";

const App: React.FC = () => {
  return (
    <PaperProvider>
      <BaseScreen />
    </PaperProvider>
  );
};

export default App;
