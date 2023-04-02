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
      return { success: true, data };
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
      return { success: true, data };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async getById(id: number): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${id}`, {
        method: "GET",
        headers: this.defaultHeaders,
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      const data = await res.json();
      return { success: true, data };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async update(user: User): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: this.defaultHeaders,
      });

      const error = this.handleError(res.status);
      if (error != null) return error;

      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Unknown Error" };
    }
  }

  async getPhotoById(id: number): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${id}/photo`, {
        method: "GET",
        headers: {
          Accept: "image/png, image/jpeg",
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

  async uploadPhotoById(id: number, photo: Blob): Promise<FetchResult> {
    try {
      const res = await fetch(this.baseUrl + `/user/${id}/photo`, {
        method: "POST",
        body: photo,
        headers: {
          Accept: "image/png, image/jpeg",
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
