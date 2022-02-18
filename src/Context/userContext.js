import React, { createContext, useState } from "react";

const userContext = createContext({});

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const contextValue = {};

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
