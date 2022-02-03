import React, {useState} from "react"
import '../App.css';
import {allWorkouts} from '../Data/Data.js' 
import Workout from "./Workout";
import Collapsible from 'react-collapsible';


const WorkoutList =() =>{
    const [workoutList, setWorkoutList] = useState();

    return(
        <div>
        {allWorkouts.map((ourWorkout)=> {
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