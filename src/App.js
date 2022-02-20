import "./App.css";
import React from "react";
import WorkoutList from "./Components/WorkoutList";
import { Login } from "./Components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import Nav from "./Components/Nav";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route
            path="/workoutlist"
            element={
              <PrivateRoute>
                <WorkoutList />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
