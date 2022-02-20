import React from "react";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { login, currentUser } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="navbar">
      {currentUser.email}
      <button className="googleButton" onClick={handleLogin}>
        Login Google
      </button>
    </div>
  );
};

export { Login };
