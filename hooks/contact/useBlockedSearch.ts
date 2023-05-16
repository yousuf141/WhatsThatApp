import React from "react";

import { type useBlockedSearchResponse } from "../../types/search/blocked/BlockedSearch";

import { type User } from "../../models/user/user";

import { contactService } from "../../services/contactService";

export const useBlockedSearch = (
  refresh: boolean,
  authKey: string
): useBlockedSearchResponse => {
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    void (async () => {
      setError(false);
      setErrorMessage("");
      setLoading(true);

      const res = await contactService.getAllBlocked(authKey);
      if (!res.success) {
        setError(true);
        setErrorMessage(res.message ?? "");
      } else {
        setUsers(res.data as User[]);
      }
      setLoading(false);
    })();
  }, [refresh]);

  return { loading, error, errorMessage, users };
};
