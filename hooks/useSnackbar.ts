import { useAlert } from "../providers/AlertProvider";

export const useSnackbar = (): { show: (message: string) => void } => {
  const [, alertDispatch] = useAlert();

  function show(message: string): void {
    alertDispatch({ open: true, message });
  }

  return { show };
};
