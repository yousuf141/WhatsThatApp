import React from "react";

import {
  type useUserSearchResponse,
  type UserSearchArgs,
} from "../types/search/user/UserSearch";

import { type User } from "../models/user/user";

import { userService } from "../services/userService";

export const useUserSearch = (
  { query = "", searchIn = "all", limit = 20, offset = 0 }: UserSearchArgs,
  authKey: string
): useUserSearchResponse => {
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [users, setUsers] = React.useState<User[]>([]);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    void (async () => {
      setError(false);
      setErrorMessage("");
      setLoading(true);

      const res = await userService.search(
        { query, searchIn, limit, offset },
        authKey
      );
      if (!res.success) {
        setError(true);
        setErrorMessage(res.message ?? "");
      } else {
        setUsers(res.data as User[]);
        setHasMore(res.data.length === limit);
      }
      setLoading(false);
    })();
  }, [query, searchIn, limit, offset]);

  return { loading, error, errorMessage, users, hasMore };
};
