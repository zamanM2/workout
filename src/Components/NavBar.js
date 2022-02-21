import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";

const NavBar = () => {
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <Link className="navbarLink" to="/workouts">
        Workouts
      </Link>
      <Link className="navbarLink" to="/myself">
        Myself
      </Link>
      <Link className="navbarLink" to="/settings">
        Settings
      </Link>
      <Link onClick={handleSignOut} className="navbarLink" to="/">
        Logout
      </Link>
    </nav>
  );
};

export default NavBar;
