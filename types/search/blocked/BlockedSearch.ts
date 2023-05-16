import { type User } from "../../../models/user/user";

export interface useBlockedSearchResponse {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  users: User[];
}
