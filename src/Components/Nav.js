import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <Link className="navbarLink" to="/workoutlist">
        WorkoutList
      </Link>
      <Link className="navbarLink" to="/">
        Login
      </Link>
    </nav>
  );
};

export default Nav;
