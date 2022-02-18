import React, { createContext, useContext, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const contextValue = { currentUser };

  const login = () => {};

  return (
    <AuthProvider.Provider value={contextValue}>
      {children}
    </AuthProvider.Provider>
  );
};
