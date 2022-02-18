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
import ConfirmModal from "./ConfirmModal";
import Collapsible from "react-collapsible";
import AddExerciseModal from "./InputModal";
import RenameWorkoutModal from "./RenameWorkoutModal";

const Workout = (props) => {
  const [myExercises, setExercises] = useState([]);
  const [showDeleteWorkoutModal, setShowDeleteWorkoutModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [showRenameWorkoutModal, setShowRenameWorkoutModal] = useState(false);

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

  const handleAddExercise = async (event, newExercise) => {
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
    });
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

  const updateCollapsibleOnOpen = (id) => {
    const newExerciseList = myExercises.map((obj) => {
      if (obj.id !== id) {
        return { ...obj, open: false };
      } else return { ...obj, open: true };
    });
    setExercises(newExerciseList);
  };

  const updateCollapsibleOnClose = (id) => {
    const newExerciseList = myExercises.map((obj) => {
      if (obj.id === id) {
        return { ...obj, open: false };
      } else return { ...obj };
    });
    setExercises(newExerciseList);
  };

  const addExerciseModalInfo = {
    title: "Add Exercise",
    body: "Name:",
    visibility: showAddExerciseModal,
    okBtn: handleAddExercise,
    hideModal: () => {
      setShowAddExerciseModal(false);
    },
    showModal: () => {
      setShowAddExerciseModal(true);
    },
  };

  const onShowRename = (event) => {
    event.preventDefault();
    setShowRenameWorkoutModal(true);
  };

  const onCloseRename = (event) => {
    event.preventDefault();
    setShowRenameWorkoutModal(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowAddExerciseModal(true)}
        className="blackBtn"
        type="submit"
      >
        Add
      </button>

      <button onClick={onShowRename} className="blackBtn">
        Rename
      </button>
      <RenameWorkoutModal
        show={showRenameWorkoutModal}
        workoutId={props.myWorkout.id}
        onHandleRenameWorkout={props.onHandleRenameWorkout}
      />

      <button
        onClick={deleteWorkoutModalInfo.showModal}
        type="submit"
        className="blackBtn"
      >
        ❌
      </button>
      <ConfirmModal info={deleteWorkoutModalInfo} />

      <AddExerciseModal info={addExerciseModalInfo} />

      <br />
      <RestTimer />

      {myExercises.map((myExercise) => (
        <div style={myStyle} key={myExercise.id}>
          <Collapsible
            trigger={myExercise.name}
            classParentString="collapsibileListExercise"
            key={myExercise.id}
            open={myExercise.open}
            onOpening={() => updateCollapsibleOnOpen(myExercise.id)}
            onClosing={() => updateCollapsibleOnClose(myExercise.id)}
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
  color: "black",
  backgroundColor: "",
  fontFamily: "Arial",
};
