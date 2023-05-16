import { type User } from "../user/user";

export interface Message {
  id: number;
  timestamp: number;
  message: string;
  author: User;
}
