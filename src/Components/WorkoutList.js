import React, {useState} from "react"
import '../App.css';
import {allWorkouts} from '../Data/Data.js' 
import Workout from "./Workout";
import Collapsible from 'react-collapsible';


const WorkoutList =() =>{
    const [workoutList, setWorkoutList] = useState(allWorkouts);
    const [newWorkout, setNewWorkout] = useState(" ");

    const handleAddWorkout =(event)=>{
    event.preventDefault();
       setWorkoutList([...workoutList,  {workoutName: newWorkout , key: Math.random()},])
    }

    const handleChange =(event)=>{
        setNewWorkout(event.target.value) 
    }
    
    return(
        <div>
    <form onSubmit= {handleAddWorkout}> 
      <button type="submit"> Add Workout </button>
      <input onChange ={handleChange} type="text" name="workout" value= {newWorkout} />
    </form>
        <br/>
        {workoutList.map((ourWorkout)=> {
            return(
             <Collapsible trigger= {ourWorkout.workoutName}classParentString= " Hello" >
             <Workout myWorkout={ourWorkout}/>
            </Collapsible> 
            )
        })}
        
       
    </div>
    )
}

export default WorkoutList;