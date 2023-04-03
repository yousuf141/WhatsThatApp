import React from "react";

interface Alert {
  open: boolean;
  message?: string;
}

const ALERT_DEFAULT: Alert = {
  open: false,
};

function AlertReducer(prevState: Alert, newState: Partial<Alert>): Alert {
  return { ...prevState, ...newState };
}

const AlertContext = React.createContext(ALERT_DEFAULT);
const AlertDispatchContext = React.createContext((_: Partial<Alert>) => {});

export const useAlert = (): [Alert, React.Dispatch<Partial<Alert>>] => {
  return [
    React.useContext(AlertContext),
    React.useContext(AlertDispatchContext),
  ];
};

const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(AlertReducer, ALERT_DEFAULT);

  return (
    <AlertContext.Provider value={state}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  );
};
export default AlertProvider;
