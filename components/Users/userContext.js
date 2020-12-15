import React, { useState } from "react";

const context = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const values = {
    user,
    setUser,
  };
  return <context.Provider value={values}>{children}</context.Provider>;
};

export default context;
