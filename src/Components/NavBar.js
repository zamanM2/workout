import React, {useState} from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const [click, setClick]= useState(false)

  const handleClick = ()=> setClick(!click)

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
      {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}
       <div className = 'menu-icon' onClick={handleClick}>
         <i className= {click ? 'fas fa-times' : 'fas fa-bars'} />
         </div>
       
    </nav>
  );
};

export default NavBar;
