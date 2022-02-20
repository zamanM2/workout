import React from "react";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="navbar">
      <button className="googleButton" onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export { Login };
