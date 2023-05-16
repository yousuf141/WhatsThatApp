import { type User } from "../user/user";
import { type Message } from "./message";

export interface ChatMetadata {
  id: number;
  name: string;
  creator: User;
  lastMessage: Message;
}
