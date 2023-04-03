import React from "react";
import { Snackbar } from "react-native-paper";

import { useAlert } from "../providers/AlertProvider";

const SnackBar: React.FC = () => {
  const [alertState, alertDispatch] = useAlert();

  function handleDismiss(): void {
    alertDispatch({ open: false });
  }

  return (
    <Snackbar
      visible={alertState.open}
      onDismiss={handleDismiss}
      duration={3000}
      action={{
        label: "Ok",
        onPress: handleDismiss,
      }}
    >
      {alertState.message ?? ""}
    </Snackbar>
  );
};

export default SnackBar;
