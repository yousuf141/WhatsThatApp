export interface UserSearchArgs {
  query: string;
  searchIn: "all" | "contacts";
  limit: number;
  offset: number;
}
