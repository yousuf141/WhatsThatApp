import React from "react";

import { useAuth } from "../../providers/AuthProvider";

import { useSnackbar } from "../useSnackbar";

import { userService } from "../../services/userService";

import { blobToBase64 } from "../../utils/files";

export const useProfileImage = (
  userId: number,
  refresh: boolean = false
): { uri: string | undefined; loading: boolean } => {
  const [auth, authDispatch] = useAuth();
  const snackbar = useSnackbar();

  const [uri, setUri] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      setLoading(true);
      setUri(await getUserImage());
      setLoading(false);
    })();
  }, [refresh]);

  async function getUserImage(): Promise<string | undefined> {
    const res = await userService.getPhotoById(userId, auth.key as string);
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
      return undefined;
    }
    const imageBlob = res.data as Blob;
    return (await blobToBase64(imageBlob)) as string;
  }

  return { uri, loading };
};
