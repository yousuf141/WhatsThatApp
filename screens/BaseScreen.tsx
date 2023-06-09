import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../providers/AuthProvider";

import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { getStorageObject } from "../utils/storage";

import SnackBar from "../components/Snackbar";
import Loading from "../components/Loading";

const BaseScreen: React.FC = () => {
  const [auth, authDispatch] = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      setIsLoading(true);

      const data = await getStorageObject("auth");
      authDispatch(data);

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <NavigationContainer>
      {auth.userId == null ? <AuthScreen /> : <HomeScreen />}
      <SnackBar />
    </NavigationContainer>
  );
};

export default BaseScreen;
