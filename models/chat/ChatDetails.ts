import { type User } from "../user/user";
import { type Contact } from "../contact/contact";
import { type Message } from "./message";

export interface ChatDetails {
  name: string;
  creator: User;
  members: Contact[];
  messages: Message[];
}
