import React from "react";

import { type useChatsSearchResponse } from "../../types/search/chat/ChatsSearch";
import { type ChatMetadata } from "../../models/chat/chat";

import { chatService } from "../../services/chatService";

export const useChatsSearch = (
  authKey: string,
  refresh: boolean
): useChatsSearchResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [chats, setChats] = React.useState<ChatMetadata[]>([]);

  React.useEffect(() => {
    void (async () => {
      setError(false);
      setErrorMessage("");
      setLoading(true);

      const res = await chatService.getAll(authKey);
      if (!res.success) {
        setError(true);
        setErrorMessage(res.message ?? "");
      } else {
        setChats(res.data as ChatMetadata[]);
      }
      setLoading(false);
    })();
  }, [refresh]);

  return { loading, error, errorMessage, chats };
};
