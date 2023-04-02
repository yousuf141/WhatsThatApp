export interface Auth {
  userId: number;
  key: string | null;
}

export const AUTH_DEFAULT: Auth = {
  userId: 0,
  key: null,
};
