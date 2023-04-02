export interface FetchResult {
  success: boolean;
  errorCode?: number;
  message?: string;
  data?: any;
}

export class BaseFetchService {
  baseUrl = process.env.API_URL ?? `http://localhost:3333/api/1.0.0`;

  defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  handleError(status: number): FetchResult | null {
    switch (status) {
      case 400:
        return { success: false, errorCode: 400, message: "Bad Request" };
      case 401:
        return { success: false, errorCode: 401, message: "Unauthorized" };
      case 403:
        return { success: false, errorCode: 403, message: "Forbidden" };
      case 404:
        return { success: false, errorCode: 404, message: "Not Found" };
      case 500:
        return { success: false, errorCode: 500, message: "Server Error" };
      default:
        return null;
    }
  }
}
