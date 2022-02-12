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
    async function fetchWorkoutData() {
      let data = await getWorkouts();
      let keys = Object.keys(data);
      return keys.map((_id) => {
        return { ...data[_id], id: _id };
      });
    }
    fetchWorkoutData().then((workouts) => {
      setWorkoutList(workouts);
    });
  }, []);

  const handleAddWorkout = async (event) => {
    event.preventDefault();
    if (newWorkout.trim() === "") return;
    await saveWorkout(newWorkout).then((post) => {
      setWorkoutList([...workoutList, { name: newWorkout, id: post.key }]);
      setNewWorkout("");
    });
  };

  const handleChange = (event) => {
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

  return (
    <div className="chest">
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
            trigger={_workout.name}
            classParentString="collapsibileList"
            key={_workout.id}
          >
            <Workout
              onDeleteWorkout={handleDeleteWorkout}
              myWorkout={_workout}
            />
          </Collapsible>
        );
      })}
    </div>
  );
};

export default WorkoutList;
