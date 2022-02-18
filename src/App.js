import "./App.css";
import React from "react";
import WorkoutList from "./Components/WorkoutList";
import { Login } from "./Components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";

function App() {
  return (
    <Router>
      <nav className="navbar">
        
          
            <Link className="navbarLink" to="/workoutlist">
              {" "}
              WorkoutList{" "}
            </Link>
          
          <Link className="navbarLink" to="/">
            {" "}
            Login{" "}
          </Link>
          
        
      </nav>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/workoutlist" element={<WorkoutList />} />
      </Routes>
    </Router>
  );
}

export default App;
