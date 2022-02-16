import React, { useEffect, useState } from "react";
import "../App.css";
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

  const updateCollapsible = (id) => {
    const newWorkoutList = workoutList.map((obj) => {
      if (obj.id !== id) {
        return { ...obj, open: false };
      } else return { ...obj, open: true };
    });
    setWorkoutList(newWorkoutList);
  };

  return (
    <div className="workoutList">
      {
        <form onSubmit={handleAddWorkout} style={{ textAlign: "left" }}>
          <button className="addWorkout" type="submit">
            Add Workout
          </button>
          <input
            onChange={handleInputChange}
            type="text"
            name="workout"
            value={newWorkout}
            className="addWorkoutInput"
          />
        </form>
      }
      <br />
      {workoutList.map((workout) => {
        return (
          <>
            <Collapsible
              open={workout.open}
              onOpening={() => updateCollapsible(workout.id)}
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
