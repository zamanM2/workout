import React, { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const contextValue = { currentUser };

  return (
    <AuthProvider.Provider value={contextValue}>
      {children}
    </AuthProvider.Provider>
  );
};
