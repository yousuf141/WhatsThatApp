import { type ChatMetadata } from "../../../models/chat/chat-metadata";

export interface useChatsSearchResponse {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  chats: ChatMetadata[];
}
