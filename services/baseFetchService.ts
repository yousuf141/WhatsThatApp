export interface FetchError {
  errorCode: number;
  message: string;
}

export class BaseFetchService {
  baseUrl = process.env.API_URL ?? `http://localhost:3333/api/1.0.0`;

  handleError(status: number): FetchError | null {
    switch (status) {
      case 400:
        return { errorCode: 400, message: "Bad Request" };
      case 401:
        return { errorCode: 401, message: "Unauthorized" };
      case 403:
        return { errorCode: 403, message: "Forbidden" };
      case 404:
        return { errorCode: 404, message: "Not Found" };
      case 500:
        return { errorCode: 500, message: "Server Error" };
      default:
        return null;
    }
  }
}
