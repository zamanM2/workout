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
  const [showDeleteWorkoutModal, setShowDeleteWorkoutModal] = useState(false);

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
    await deleteExercise(id).then(() => {
      setExercises(
        myExercises.filter((currentExercise) => currentExercise.id !== id)
      );
    });
  };

  const deleteWorkoutModalInfo = {
    title: "Delete Workout?",
    body: "Are you sure you want to delete this workout?",
    visibility: showDeleteWorkoutModal,
    okBtn: () => {
      props.onDeleteWorkout(props.myWorkout.id, myExercises);
    },
    hideModal: () => {
      setShowDeleteWorkoutModal(false);
    },
    showModal: () => {
      setShowDeleteWorkoutModal(true);
    },
  };

  return (
    <div>
      <button onClick={deleteWorkoutModalInfo.showModal} type="submit">
        Delete Workout
      </button>
      <Popup info={deleteWorkoutModalInfo} />
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
