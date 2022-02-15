import React, { useEffect, useState } from "react";
import Exercise from "./Exercise";
import "../App.css";
import RestTimer from "./RestTimer";
import "../css/blackBtn.css";
import {
  deleteExercise,
  getExercises,
  saveExercise,
} from "../Firebase/WorkoutApi";
import Popup from "./Popup";

const Workout = (props) => {
  const [myExercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");

  useEffect(() => {
    getExercises().then((allExercises) => {
      setExercises(
        allExercises.filter(function (exercise) {
          return exercise.workoutId === props.myWorkout.id;
        })
      );
    });
  }, [props.myWorkout.id]);

  const handleAddExercise = async (event) => {
    event.preventDefault();
    if (newExercise.trim() === "") return;
    await saveExercise(newExercise, props.myWorkout.id).then((post) => {
      setExercises([
        ...myExercises,
        {
          name: newExercise,
          workoutId: props.myWorkout.id,
          id: post.key,
        },
      ]);
      setNewExercise("");
    });
  };

  const handleChange = (event) => {
    setNewExercise(event.target.value);
  };

  const handleDeleteExercise = async (id) => {
    await deleteExercise(id).then((post) => {
      setExercises(
        myExercises.filter((currentExercise) => currentExercise.id !== id)
      );
    });
  };

  return (
    <div>
      <button onClick={props.info.showModal} type="submit">
        Delete Workout
      </button>
      <Popup
        info={{
          ...props.info,
          okBtn: () => props.onDeleteWorkout(props.myWorkout.id, myExercises),
        }}
      />
      <form onSubmit={handleAddExercise}>
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

      {myExercises.map((myExercise) => (
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
