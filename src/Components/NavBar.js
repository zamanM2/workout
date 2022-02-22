import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown]= useState(false)

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link className="navbarLink" to="/workouts" onClick={closeMobileMenu}>
            Workouts
          </Link>
        </li>

        <li className="nav-item">
          <Link className="navbarLink" to="/myself" onClick={closeMobileMenu}>
            Myself
          </Link>
        </li>

        <li className="nav-item">
          <Link className="navbarLink" to="/settings" onClick={closeMobileMenu}>
            Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            onClick={handleSignOut}
            className="navbarLink"
            to="/"
            // onClick={closeMobileMenu}
          >
            Logout
          </Link>
          {dropdown && <Dropdown />}
        </li>
      </ul>
      {/* <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"} />
      <li className="nav-item">
        <Link to="/workout" className="nav-links" onClick={closeMobileMenu} />
        
      </li>
      <li className="nav-item">
        <Link to="/Myself" className="nav-links" onClick={closeMobileMenu} />
      </li>
      <li className="nav-item">
        <Link to="/Setting" className="nav-links" onClick={closeMobileMenu} />
      </li>
      <li className="nav-item">
        <Link 
          to="/Logout" 
          className="fas fa-caret-down" 
          onClick={closeMobileMenu} />
      </li> */}
    </nav>
  );
};

export default NavBar;
