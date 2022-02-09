import React, { useState } from "react";
import "../App.css";
import { allWorkouts } from "../Data/Data.js";
import Workout from "./Workout";
import Collapsible from "react-collapsible";
import { getWorkouts } from "../Firebase/WorkoutApi";

const WorkoutList = () => {
  const myData = getWorkouts();
  const [workoutList, setWorkoutList] = useState(allWorkouts);
  const [newWorkout, setNewWorkout] = useState("");
  
  const handleAddWorkout = (event) => {
    event.preventDefault();
    setWorkoutList([
      ...workoutList,
      { workoutName: newWorkout, id: Math.random() },
    ]);
  };

  const handleChange = (event) => {
    setNewWorkout(event.target.value);
  };

  const handleDeleteWorkout = (id) => {
    setWorkoutList(workoutList.filter((myWorkout) => myWorkout.id !== id));
  };

  return (
    <div>
      {
        <form onSubmit={handleAddWorkout} style={{ textAlign: "left" }}>
          <button className="addWorkout" type="submit">
            Add Workout
          </button>
          <input
            onChange={handleChange}
            type="text"
            name="workout"
            value={newWorkout}
            className="addWorkoutInput"
          />
        </form>
      }
      <br />
      {workoutList.map((_workout) => {
        return (
          <Collapsible
            trigger={_workout.workoutName}
            classParentString="collapsibileList"
            key={_workout.id}
          >
            <Workout
              onDeleteWorkout={() => handleDeleteWorkout(_workout.id)}
              myWorkout={_workout}
            />
          </Collapsible>
        );
      })}
    </div>
  );
};

export default WorkoutList;
