import { type Contact } from "../../../models/contact/contact";

export interface useContactSearchResponse {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  contacts: Contact[];
}
