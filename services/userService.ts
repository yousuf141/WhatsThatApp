import { type File } from "buffer";
import { type User } from "../models/user/user";
import { type UserPost } from "../models/user/userPost";
import { BaseFetchService, type FetchResult } from "./baseFetchService";

class UserService extends BaseFetchService {
  async login(email: string, password: string): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + "/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: this.defaultHeaders,
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.json();
      return { success: true, data: { userId: data.id, key: data.token } };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async logout(): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + "/logout", {
        method: "POST",
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async register(user: UserPost): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + "/user", {
        method: "POST",
        body: JSON.stringify({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: user.password,
        }),
        headers: this.defaultHeaders,
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.json();
      return {
        success: true,
        data: {
          userId: data.user_id,
        },
      };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async getById(id: number, authKey: string): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${id}`, {
        method: "GET",
        headers: { ...this.defaultHeaders, "X-Authorization": authKey },
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.json();
      return {
        success: true,
        data: {
          id: data.user_id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
        } satisfies User,
      };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async update(
    user: User,
    password: string | null,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: password ?? "",
        }),
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

  async getPhotoById(id: number, authKey: string): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${id}/photo`, {
        method: "GET",
        headers: {
          Accept: "image/png, image/jpeg",
          "X-Authorization": authKey,
        },
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.blob();
      return { success: true, data };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async uploadPhotoById(
    id: number,
    blob: Blob,
    fileType: string,
    authKey: string
  ): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${id}/photo`, {
        method: "POST",
        body: blob,
        headers: {
          "Content-Type": fileType,
          "X-Authorization": authKey,
        },
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.blob();
      return { success: true, data };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }
}

export const userService = new UserService();
