import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/workouts" /> : children;
}

export default PublicRoute;
