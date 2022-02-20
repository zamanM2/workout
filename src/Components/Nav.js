import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Nav = () => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <nav className="navbar">
      <Link className="navbarLink" to="/workoutlist">
        WorkoutList
      </Link>
      <Link onClick={handleSignOut} className="navbarLink" to="/">
        Signout
      </Link>
    </nav>
  );
};

export default Nav;
