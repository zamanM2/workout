import React, {useState} from "react"
import '../App.css';
import allWorkouts from '../Data/Data.js' 


const WorkoutList =() =>{
const [workoutList, setWorkoutList] = useState();

return(
    <Collapsible trigger= {props.name} classParentString= " Hello" >
    <form onSubmit= {handleAddExercise}> 
    <button type="submit"> Add Exercise </button>
    <input onChange ={handleChange} type="text" name="exercise" value= {newExercise} />

    </form>
    <br/>
    <br/>
  <RestTimer>Timer</RestTimer>
 

 <p style ={mystyle}> 
   {myExercises.map((exercise) =>
<Exercise exercise= {exercise}></Exercise>
 )
   }
    </p>
  </Collapsible>
    )
}

export default WorkoutList;