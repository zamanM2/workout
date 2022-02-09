import './App.css';
import React from 'react';
import  Workout from './Components/Workout'
import WorkoutList from './Components/WorkoutList'
import { initializeApp } from './Firebase/FirebaseConfig'
import { getWorkouts } from './Firebase/WorkoutApi';


// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";


function App() {
  return (
   
    <div className = "chest">  <WorkoutList  /> 
    </div>

   
  );
}




export default App;
