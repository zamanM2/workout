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
  renameWorkout,
} from "../Firebase/WorkoutApi";
import { useAuth } from "../Context/AuthContext";
import Container from "react-bootstrap/Container";

const WorkoutList = () => {
  const [workoutList, setWorkoutList] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    getWorkouts(currentUser.uid).then((workouts) => {
      setWorkoutList(workouts.map((element) => ({ ...element, open: false })));
    });
  }, []);

  const handleAddWorkout = async (event) => {
    event.preventDefault();
    if (newWorkout.trim() === "") return;
    await addWorkout(currentUser.uid, newWorkout).then((post) => {
      setWorkoutList([
        ...workoutList,
        { name: newWorkout, id: post.key, open: false, sort: 1 },
      ]);
      setNewWorkout("");
    });
  };

  const handleInputChange = (event) => {
    setNewWorkout(event.target.value);
  };

  const handleDeleteWorkout = async (workoutId, exercises) => {
    await deleteWorkout(currentUser.uid, workoutId).then((post) => {
      setWorkoutList(
        workoutList.filter((myWorkout) => myWorkout.id !== workoutId)
      );
    });
    await deleteAllExercises(currentUser.uid, exercises);
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

  const handleRenameWorkout = (event, workout, newName) => {
    event.preventDefault();
    if (newName.trim() === "") return;
    const newWorkoutList = [...workoutList];
    for (const element of newWorkoutList) {
      if (element.id === workout.id) {
        element.name = newName;
      }
    }
    renameWorkout(currentUser.uid, workout).then(() => {
      setWorkoutList(newWorkoutList);
    });
  };

  return (
    <Container className="workoutList">
      <Container>
        <AddWorkoutForm
          handleAddWorkout={handleAddWorkout}
          handleInputChange={handleInputChange}
          newWorkout={newWorkout}
        />
      </Container>
      {workoutList.map((workout) => {
        return (
          <Container key={workout.id}>
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
          </Container>
        );
      })}
    </Container>
  );
};

export default WorkoutList;
