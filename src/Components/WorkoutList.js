import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/addWorrkoutBtn.css";
import Workout from "./Workout";
import Collapsible from "react-collapsible";
import {
  getWorkouts,
  saveWorkout,
  deleteWorkout,
  deleteAllExercises,
} from "../Firebase/WorkoutApi";

const WorkoutList = () => {
  const [workoutList, setWorkoutList] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");
  const [showWorkoutButton, setShowWorkoutButton] = useState(true);

  useEffect(() => {
    getWorkouts().then((workouts) => {
      setWorkoutList(workouts.map((element) => ({ ...element, open: false })));
    });
  }, []);

  const handleAddWorkout = async (event) => {
    event.preventDefault();
    if (newWorkout.trim() === "") return;
    await saveWorkout(newWorkout).then((post) => {
      setWorkoutList([
        ...workoutList,
        { name: newWorkout, id: post.key, open: false },
      ]);
      setNewWorkout("");
      setShowWorkoutButton(true);
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

  return (
    <div className="workoutList">
      {
        <>
          {showWorkoutButton ? (
            <button
              onClick={() => {
                setShowWorkoutButton(false);
              }}
              className="addWorkout"
              type="submit"
            >
              Add Workout
            </button>
          ) : (
            <form onSubmit={handleAddWorkout}>
              <input
                onChange={handleInputChange}
                value={newWorkout}
                type="text"
                name="workout"
              />
              <button type="Submit">✔</button>
              <button
                onClick={() => {
                  setShowWorkoutButton(true);
                }}
              >
                ❌
              </button>
            </form>
          )}
        </>
      }
      <br />
      {workoutList.map((workout) => {
        return (
          <>
            <Collapsible
              className="collapasableList"
              open={workout.open}
              onOpening={() => updateCollapsibleOnOpen(workout.id)}
              onClosing={() => updateCollapsibleOnClose(workout.id)}
              trigger={workout.name}
              classParentString="collapsibileList"
              key={workout.id}
            >
              <Workout
                onDeleteWorkout={handleDeleteWorkout}
                myWorkout={workout}
              />
            </Collapsible>
            <br />
          </>
        );
      })}
    </div>
  );
};

export default WorkoutList;
