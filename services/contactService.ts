import { type Contact } from "../models/contact/contact";
import { BaseFetchService, type FetchResult } from "./baseFetchService";

class ContactService extends BaseFetchService {
  async getAll(authKey: string): Promise<FetchResult> {
    return await this.getContact(this.baseUrl + "/contacts", authKey);
  }

  async getAllBlocked(authKey: string): Promise<FetchResult> {
    return await this.getContact(this.baseUrl + "/blocked", authKey);
  }

  async addById(userId: number, authKey: string): Promise<FetchResult> {
    return await this.addContact(
      this.baseUrl + `/user/${userId}/contact`,
      authKey
    );
  }

  async addBlockedById(userId: number, authKey: string): Promise<FetchResult> {
    return await this.addContact(
      this.baseUrl + `/user/${userId}/block`,
      authKey
    );
  }

  async deleteById(userId: number, authKey: string): Promise<FetchResult> {
    return await this.deleteContact(
      this.baseUrl + `/user/${userId}/contact`,
      authKey
    );
  }

  async deleteBlockedById(
    userId: number,
    authKey: string
  ): Promise<FetchResult> {
    return await this.deleteContact(
      this.baseUrl + `/user/${userId}/block`,
      authKey
    );
  }

  async getContact(endpoint: string, authKey: string): Promise<FetchResult> {
    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: { ...this.defaultHeaders, "X-Authorization": authKey },
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.json();
      const contacts: Contact[] = data.map((x: any) => ({
        id: x.user_id,
        firstName: x.first_name,
        lastName: x.last_name,
        email: x.email,
      }));

      return {
        success: true,
        data: contacts,
      };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async addContact(endpoint: string, authKey: string): Promise<FetchResult> {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
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

  async deleteContact(endpoint: string, authKey: string): Promise<FetchResult> {
    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
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

export const contactServie = new ContactService();
