import { type ChatMetadata } from "../../../models/chat/ChatMetadata";

export interface useChatsSearchResponse {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  chats: ChatMetadata[];
}
