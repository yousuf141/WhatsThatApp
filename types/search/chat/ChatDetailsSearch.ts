import { type ChatDetails } from "../../../models/chat/ChatDetails";

export interface ChatDetailsSearchArgs {
  id: number;
  limit: number;
  offset: number;
}

export interface useChatDetailsSearchResponse {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  chatDetails: ChatDetails | null;
}
