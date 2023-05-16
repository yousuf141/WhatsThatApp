import React from "react";

import { type useContactSearchResponse } from "../types/search/contact/ContactSearch";

import { type Contact } from "../models/contact/contact";

import { contactService } from "../services/contactService";

export const useContactSearch = (
  refresh: boolean,
  authKey: string
): useContactSearchResponse => {
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [contacts, setContacts] = React.useState<Contact[]>([]);

  React.useEffect(() => {
    void (async () => {
      setError(false);
      setErrorMessage("");
      setLoading(true);

      const res = await contactService.getAll(authKey);
      if (!res.success) {
        setError(true);
        setErrorMessage(res.message ?? "");
      } else {
        setContacts(res.data as Contact[]);
      }
      setLoading(false);
    })();
  }, [refresh]);

  return { loading, error, errorMessage, contacts };
};
