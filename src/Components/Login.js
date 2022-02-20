import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/workouts");
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
