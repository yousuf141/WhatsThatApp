import { type User } from "../../../models/user/user";

export interface UserSearchArgs {
  query: string;
  searchIn: "all" | "contacts";
  limit: number;
  offset: number;
}

export interface useUserSearchResponse {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  users: User[];
  hasMore: boolean;
}
