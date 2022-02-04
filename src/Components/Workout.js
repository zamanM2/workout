import React, {useState} from "react"
import Collapsible from 'react-collapsible';
import Exercise from './Exercise'
import {exercises} from '../Data/Data.js' 
import '../App.css';
import RestTimer from './RestTimer';


const Workout = (props) => {
  const [myExercises, setExcercises] = useState(exercises)
  const [newExercise, setNewExercise]= useState("")
  const handleAddExercise =(event) =>{
    
    event.preventDefault(); 
      setExcercises([...myExercises, {exercise: newExercise, reps: 0, sets: 0, key:props.myWorkout.key} ])
  }

  const handleChange =(event) =>{
    setNewExercise(event.target.value) 
  }
  const handleDeleteExercise =(event)=>{
    event.preventDefault();
    setExcercises()
  }
  return (
   <div>  
      <form onSubmit= {handleAddExercise}> 
      <button type="submit"> Add Exercise </button>
      <input onChange ={handleChange} type="text" name="exercise" value= {newExercise} />

      </form>
      <br/>
      <br/>
    <RestTimer>Timer</RestTimer>
   
    {myExercises.filter(function (exercise) {
        return exercise.key === props.myWorkout.key;
    }).map((myExercise) =>
    <p style ={mystyle}> 
    <Exercise onDeleteExercise={handleDeleteExercise} exercise= {myExercise}></Exercise> </p>) 
    
    }

  
      
   </div>
  );

};

const mystyle = {
    color: "white",
    backgroundColor: "",
    padding: "15px",
    fontFamily: "Arial"
  };




export default Workout;
