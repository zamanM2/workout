import "./App.css";
import React from "react";
import WorkoutList from "./Components/WorkoutList";
import { Login } from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import Nav from "./Components/Nav";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/workoutlist"
            element={
              <PrivateRoute>
                <Nav />
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
