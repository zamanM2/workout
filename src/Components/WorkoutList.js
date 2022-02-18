import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/addWorrkoutBtn.css";
import Workout from "./Workout";
import Collapsible from "react-collapsible";
import AddWorkoutForm from "./AddWorkoutForm";
import {
  getWorkouts,
  addWorkout,
  deleteWorkout,
  deleteAllExercises,
} from "../Firebase/WorkoutApi";

const WorkoutList = () => {
  const [workoutList, setWorkoutList] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");

  useEffect(() => {
    getWorkouts().then((workouts) => {
      setWorkoutList(workouts.map((element) => ({ ...element, open: false })));
    });
  }, []);

  const handleAddWorkout = async (event) => {
    event.preventDefault();
    if (newWorkout.trim() === "") return;
    await addWorkout(newWorkout).then((post) => {
      setWorkoutList([
        ...workoutList,
        { name: newWorkout, id: post.key, open: false },
      ]);
      setNewWorkout("");
    });
  };

  const handleInputChange = (event) => {
    setNewWorkout(event.target.value);
  };

  const handleDeleteWorkout = async (workoutId, exercises) => {
    await deleteWorkout(workoutId).then((post) => {
      setWorkoutList(
        workoutList.filter((myWorkout) => myWorkout.id !== workoutId)
      );
    });
    await deleteAllExercises(exercises);
  };

  const updateCollapsibleOnOpen = (id) => {
    const newWorkoutList = workoutList.map((obj) => {
      if (obj.id !== id) {
        return { ...obj, open: false };
      } else return { ...obj, open: true };
    });
    setWorkoutList(newWorkoutList);
  };

  const updateCollapsibleOnClose = (id) => {
    const newWorkoutList = workoutList.map((obj) => {
      if (obj.id === id) {
        return { ...obj, open: false };
      } else return { ...obj };
    });
    setWorkoutList(newWorkoutList);
  };

  const handleRenameWorkout = (event, workoutId, newName) => {
    event.preventDefault();
    const newWorkoutList = [...workoutList];
    for (const element of newWorkoutList) {
      if (element.id === workoutId) {
        element.name = newName;
      }
    }
    setWorkoutList(newWorkoutList);
  };

  return (
    <div className="workoutList">
      <AddWorkoutForm
        handleAddWorkout={handleAddWorkout}
        handleInputChange={handleInputChange}
        newWorkout={newWorkout}
      />
      <br />
      {workoutList.map((workout) => {
        return (
          <div key={workout.id}>
            <Collapsible
              className="collapasableList"
              open={workout.open}
              onOpening={() => updateCollapsibleOnOpen(workout.id)}
              onClosing={() => updateCollapsibleOnClose(workout.id)}
              trigger={workout.name}
              classParentString="collapsibileList"
            >
              <Workout
                className="workoutClass"
                onDeleteWorkout={handleDeleteWorkout}
                onHandleRenameWorkout={handleRenameWorkout}
                myWorkout={workout}
              />
            </Collapsible>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutList;
