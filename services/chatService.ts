import { type ChatMetadata } from "../models/chat/chat-metadata";
import { type Message } from "../models/chat/message";
import { type User } from "../models/user/user";

import { BaseFetchService, type FetchResult } from "./baseFetchService";

class ChatService extends BaseFetchService {
  async getAll(authKey: string): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + "/chat", {
        method: "GET",
        headers: { ...this.defaultHeaders, "X-Authorization": authKey },
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.json();
      const chats: ChatMetadata[] = data.map((x: any) => ({
        id: x.chat_id,
        name: x.name,
        creator: {
          id: x.creator.user_id,
          firstName: x.creator.first_name,
          lastName: x.creator.last_name,
          email: x.creator.email,
        } satisfies User,
        lastMessage: {
          id: x.last_message.message_id,
          timestamp: x.last_message.timestamp,
          message: x.last_message.message,
          author: {
            id: x.last_message.author?.user_id,
            firstName: x.last_message.author?.first_name,
            lastName: x.last_message.author?.last_name,
            email: x.last_message.author?.email,
          } satisfies User,
        } satisfies Message,
      }));
      return {
        success: true,
        data: chats satisfies ChatMetadata[],
      };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async createChat(name: string, authKey: string): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + "/chat", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { ...this.defaultHeaders, "X-Authorization": authKey },
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }
}

export const chatService = new ChatService();
