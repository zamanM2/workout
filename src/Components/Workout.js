import React, { useState } from "react";
import Exercise from "./Exercise";
import { exercises } from "../Data/Data.js";
import "../App.css";
import RestTimer from "./RestTimer";
import "../css/blackBtn.css";

const Workout = (props) => {
  const [myExercises, setExcercises] = useState(exercises);
  const [newExercise, setNewExercise] = useState("");

  const handleAddExercise = (event) => {
    event.preventDefault();
    setExcercises([
      ...myExercises,
      {
        exercise: newExercise,
        workoutId: props.myWorkout.id,
        id: Math.random(),
      },
    ]);
  };

  const handleChange = (event) => {
    setNewExercise(event.target.value);
  };

  const handleDeleteExercise = (name) => {
    setExcercises(
      myExercises.filter((currentExercise) => currentExercise.exercise !== name)
    );
  };

  return (
    <div>
      <form onSubmit={handleAddExercise}>
        <button onClick={props.onDeleteWorkout} type="submit">
          Delete Workout
        </button>
        <br />
        <button className="blackBtn" type="submit">
          Add Exercise
        </button>
        <input
          onChange={handleChange}
          type="text"
          name="exercise"
          value={newExercise}
        />
      </form>
      <br />
      <RestTimer />

      {myExercises
        .filter(function (exercise) {
          return exercise.workoutId === props.myWorkout.id;
        })
        .map((myExercise) => (
          <div style={myStyle} key={myExercise.id}>
            <Exercise
              onDeleteExercise={() => {
                handleDeleteExercise(myExercise.exercise);
              }}
              exercise={myExercise}
            />
          </div>
        ))}
    </div>
  );
};

export default Workout;

const myStyle = {
  color: "white",
  backgroundColor: "",
  padding: "15px",
  fontFamily: "Arial",
};
