import "./App.css";
import React from "react";
import WorkoutList from "./Components/WorkoutList";
import { Login } from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PublicRoute>
                <Home />
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/workouts"
            element={
              <PrivateRoute>
                <NavBar />
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
