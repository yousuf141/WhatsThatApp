import React from "react";

import { AUTH_DEFAULT, type Auth } from "../models/auth";

const AuthReducer = (prevState: Auth, newState: Partial<Auth>): Auth => {
  return { ...prevState, ...newState };
};

const AuthContext = React.createContext(AUTH_DEFAULT);
const AuthDispatchContext = React.createContext((_: Partial<Auth>) => {});

export const useAuth = (): [Auth, React.Dispatch<Partial<Auth>>] => {
  return [React.useContext(AuthContext), React.useContext(AuthDispatchContext)];
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(AuthReducer, AUTH_DEFAULT);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
