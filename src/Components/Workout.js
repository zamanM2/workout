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
import Collapsible from "react-collapsible";

const Workout = (props) => {
  const [myExercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");
  const [showDeleteWorkoutModal, setShowDeleteWorkoutModal] = useState(false);

  useEffect(() => {
    getExercises().then((allExercises) => {
      allExercises.map((element) => ({ ...element, open: false }));
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

  const updateCollapsible = (id) => {
    const newExerciseList = myExercises.map((obj) => {
      if (obj.id !== id) {
        return { ...obj, open: false };
      } else return { ...obj, open: true };
    });
    setExercises(newExerciseList);
  };

  return (
    <div>
      <button
        onClick={deleteWorkoutModalInfo.showModal}
        type="submit"
        style={{ fontSize: "15px" }}
      >
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
          style={{ lineHeight: "10px", marginLeft: "3px" }}
        />
      </form>
      <br />
      <RestTimer />

      {myExercises.map((myExercise) => (
        <div style={myStyle} key={myExercise.id}>
          <Collapsible
            trigger={myExercise.name}
            classParentString="collapsibileListExercise"
            key={myExercise.id}
            open={myExercise.open}
            onOpening={() => updateCollapsible(myExercise.id)}
          >
            <Exercise
              onDeleteExercise={() => {
                handleDeleteExercise(myExercise.id);
              }}
              exercise={myExercise}
            />
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default Workout;

const myStyle = {
  color: "white",
  backgroundColor: "",
  fontFamily: "Arial",
};
