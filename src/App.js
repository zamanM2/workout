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
import MySelf from "./Components/Myself";
import Settings from "./Components/Settings";
import TimerProvider from "./Context/TimerContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TimerProvider>
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
            <Route
              path="/myself"
              element={
                <PrivateRoute>
                  <NavBar />
                  <MySelf />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <NavBar />
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </TimerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
