import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import {
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithRedirect(auth, provider);
  };

  const contextValue = { currentUser, login };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
