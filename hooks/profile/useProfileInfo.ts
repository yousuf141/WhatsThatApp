import React from "react";

import { useAuth } from "../../providers/AuthProvider";
import { useSnackbar } from "../useSnackbar";

import { userService } from "../../services/userService";

import { type User } from "../../models/user/user";

interface UseProfileInfoProps {
  user: User | null;
  loading: boolean;
}

export const useProfileInfo = (
  userId: number,
  shouldRefresh: boolean = false
): UseProfileInfoProps => {
  const [auth, authDispatch] = useAuth();
  const snackbar = useSnackbar();

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      setLoading(true);

      setUser(await getUserInfo());

      setLoading(false);
    })();
  }, [shouldRefresh]);

  async function getUserInfo(): Promise<User | null> {
    const res = await userService.getById(userId, auth.key as string);
    if (!res.success) {
      switch (res.errorCode) {
        case 401:
          authDispatch({ userId: undefined, key: undefined });
          break;
        case 404:
          snackbar.show("Error: could not find profile.");
          break;
        default:
          snackbar.show("Unknown Error");
      }
      return null;
    }
    return res.data as User;
  }

  return { user, loading };
};
