import { createContext, useState } from "react";

export const PermitContext = createContext();

export const PermitProvider = ({ children }) => {

  const [permits, setPermits] = useState([]);

  const addPermit = (permit) => {
    setPermits([...permits, permit]);
  };

  return (
    <PermitContext.Provider
      value={{
        permits,
        addPermit
      }}
    >
      {children}
    </PermitContext.Provider>
  );
};