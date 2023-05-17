import React from "react";

import {
  type ChatDetailsSearchArgs,
  type useChatDetailsSearchResponse,
} from "../../types/search/chat/ChatDetailsSearch";

import { type ChatDetails } from "../../models/chat/ChatDetails";

import { chatService } from "../../services/chatService";

export const useChatDetailsSearch = (
  { id, limit, offset }: ChatDetailsSearchArgs,
  authKey: string,
  refresh: boolean
): useChatDetailsSearchResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [chatDetails, setChatDetails] = React.useState<ChatDetails | null>(
    null
  );

  React.useEffect(() => {
    void (async () => {
      setError(false);
      setErrorMessage("");
      setLoading(true);

      const res = await chatService.getDetailsById(
        { id, limit, offset },
        authKey
      );
      if (!res.success) {
        setError(true);
        setErrorMessage(res.message ?? "");
      } else {
        setChatDetails(res.data as ChatDetails);
      }
      setLoading(false);
    })();
  }, [refresh]);

  return { loading, error, errorMessage, chatDetails };
};
