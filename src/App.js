import "./App.css";
import React from "react";
import WorkoutList from "./Components/WorkoutList";
import { Login } from "./Components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
