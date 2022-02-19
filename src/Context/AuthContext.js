import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import { getAuth, signInWithRedirect, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const login = () => {
    const auth = getAuth();
    return signInWithRedirect(auth, provider);
  };

  const contextValue = { currentUser, login };

  return (
    <AuthProvider.Provider value={contextValue}>
      {children}
    </AuthProvider.Provider>
  );
};
