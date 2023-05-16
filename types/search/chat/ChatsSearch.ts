import { type ChatMetadata } from "../../../models/chat/chat";

export interface useChatsSearchResponse {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  chats: ChatMetadata[];
}
