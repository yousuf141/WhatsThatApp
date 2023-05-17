import { type ChatDetails } from "../models/chat/ChatDetails";
import { type ChatMetadata } from "../models/chat/ChatMetadata";
import { type Message } from "../models/chat/message";
import { type User } from "../models/user/user";
import { type ChatDetailsSearchArgs } from "../types/search/chat/ChatDetailsSearch";

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

  async getDetailsById(
    { id, limit, offset }: ChatDetailsSearchArgs,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const url = new URL(this.baseUrl + `/chat/${id}`);
      url.searchParams.append("limit", limit.toString());
      url.searchParams.append("offset", offset.toString());

      const res = await fetch(url.href, {
        method: "GET",
        headers: { ...this.defaultHeaders, "X-Authorization": authKey },
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.json();
      const chatDetails: ChatDetails = {
        name: data.name,
        creator: {
          id: data.creator.user_id,
          firstName: data.creator.first_name,
          lastName: data.creator.last_name,
          email: data.creator.emial,
        },
        members: data.members.map((x: any) => ({
          id: x.user_id,
          firstName: x.first_name,
          lastName: x.last_name,
          email: x.email,
        })),
        messages: data.messages.map((x: any) => ({
          id: x.message_id,
          timestamp: x.timestamp,
          message: x.message,
          author: {
            id: x.author.user_id,
            firstName: x.author.first_name,
            lastName: x.author.last_name,
            email: x.author.email,
          },
        })),
      };
      return {
        success: true,
        data: chatDetails satisfies ChatDetails,
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

  async updateChat(
    name: string,
    chatId: number,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/chat/${chatId}`, {
        method: "PATCH",
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

  async addContactToChat(
    chatId: number,
    contactId: number,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(
        this.baseUrl + `/chat/${chatId}/user/${contactId}`,
        {
          method: "POST",
          headers: { ...this.defaultHeaders, "X-Authorization": authKey },
        }
      );

      const error = this.handleError(res.status);
      if (error != null) return error;

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async removeContactFromChat(
    chatId: number,
    contactId: number,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(
        this.baseUrl + `/chat/${chatId}/user/${contactId}`,
        {
          method: "DELETE",
          headers: { ...this.defaultHeaders, "X-Authorization": authKey },
        }
      );

      const error = this.handleError(res.status);
      if (error != null) return error;

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async createMessage(
    chatId: number,
    message: string,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/chat/${chatId}/message`, {
        method: "POST",
        body: JSON.stringify({ message }),
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

  async updateMessage(
    chatId: number,
    messageId: number,
    message: string,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(
        this.baseUrl + `/chat/${chatId}/message/${messageId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ message }),
          headers: { ...this.defaultHeaders, "X-Authorization": authKey },
        }
      );

      const error = this.handleError(res.status);
      if (error != null) return error;

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async deleteMessageById(
    chatId: number,
    messageId: number,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(
        this.baseUrl + `/chat/${chatId}/message/${messageId}`,
        {
          method: "DELETE",
          headers: { ...this.defaultHeaders, "X-Authorization": authKey },
        }
      );

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
