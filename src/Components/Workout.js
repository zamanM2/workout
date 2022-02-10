import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";
import "../App.css";
import RestTimer from "./RestTimer";
import "../css/blackBtn.css";
import { getExercises } from "../Firebase/WorkoutApi";
import { saveExercise } from "../Firebase/WorkoutApi";
import { deleteExercise } from "../Firebase/WorkoutApi";

const Workout = (props) => {
  const [myExercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");

  useEffect(async () => {
    let snapshot = await getExercises();
    let keys = Object.keys(snapshot.val());
    let exercises = keys.map((_id) => {
      return { ...snapshot.val()[_id], id: _id };
    });
    setExercises(exercises);
  }, []);

  const handleAddExercise = async (event) => {
    event.preventDefault();
    await saveExercise(newExercise, props.myWorkout.id).then((post) => { 
      setExercises([
        ...myExercises,
        {
          name: newExercise,
          workoutId: props.myWorkout.id,
          id: post.key,
        },
      ]);
    });
    
  };

  const handleChange = (event) => {
    setNewExercise(event.target.value);
  };

  const handleDeleteExercise = async(id) => {
    await deleteExercise(id).then((post) => {
      setExercises(
      myExercises.filter((currentExercise) => currentExercise.id !== id)
      ); 
    });
    
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
                handleDeleteExercise(myExercise.id);
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
