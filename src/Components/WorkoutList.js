import React, { useEffect, useState } from "react";
import "../App.css";
import Workout from "./Workout";
import Collapsible from "react-collapsible";
import { getWorkouts, saveWorkout } from "../Firebase/WorkoutApi";

const WorkoutList = () => {
  const [workoutList, setWorkoutList] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");

  useEffect(() => {
    async function fetchWorkoutData() {
      let snapshot = await getWorkouts();
      let keys = Object.keys(snapshot.val());
      let workouts = keys.map((_id) => {
        return { ...snapshot.val()[_id], id: _id };
      });
      setWorkoutList(workouts);
    }
    fetchWorkoutData();
  }, []);

  const handleAddWorkout = async (event) => {
    event.preventDefault();
    await saveWorkout(newWorkout).then((post) => {
      setWorkoutList([...workoutList, { name: newWorkout, id: post.key }]);
    });
  };

  const handleChange = (event) => {
    setNewWorkout(event.target.value);
  };

  const handleDeleteWorkout = (id) => {
    setWorkoutList(workoutList.filter((myWorkout) => myWorkout.id !== id));
  };

  return (
    <div>
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
              onDeleteWorkout={() => handleDeleteWorkout(_workout.id)}
              myWorkout={_workout}
            />
          </Collapsible>
        );
      })}
    </div>
  );
};

export default WorkoutList;
