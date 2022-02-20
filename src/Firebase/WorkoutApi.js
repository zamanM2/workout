import { dbRef } from "./FirebaseConfig";
import { child, get, push, remove, update } from "firebase/database";
import { useAuth } from "../Context/AuthContext";

let getUser = () => {
  return "pvTXt2ruj6e6tu47Nbwx76kMvzp1";
};

const getWorkouts = async (userId) => {
  const snapshot = await get(child(dbRef, `/workouts/${userId}`));
  let keys = Object.keys(snapshot.val());
  return keys.map((_id) => {
    return { ...snapshot.val()[_id], id: _id };
  });
};

const getExercises = async (userId) => {
  const snapshot = await get(child(dbRef, `/exercises/${userId}`));
  let keys = Object.keys(snapshot.val());
  return keys.map((_id) => {
    return { ...snapshot.val()[_id], id: _id };
  });
};

const addWorkout = async (userId, workout) => {
  return push(child(dbRef, `/workouts/${userId}`), {
    name: workout,
    sort: 1,
  });
};

const deleteWorkout = async (userId, workoutId) => {
  return remove(child(dbRef, `/workouts/${userId}/${workoutId}`));
};

const renameWorkout = async (userId, workout, newName) => {
  const updates = {};
  updates[`/workouts/${userId}/${workout.id}`] = {
    name: workout.name,
    sort: workout.sort,
  };
  return update(dbRef, updates);
};

const addExercise = async (userId, exercise, _workoutId) => {
  return push(child(dbRef, `/exercises/${userId}`), {
    name: exercise,
    workoutId: _workoutId,
    sort: 1,
  });
};

const deleteExercise = async (userId, exerciseId) => {
  return remove(child(dbRef, `/exercises/${userId}/${exerciseId}`));
};

const deleteAllExercises = async (userId, allExercises) => {
  const updates = {};
  allExercises.forEach(
    (exercise) => (updates[`/exercises/${userId}/${exercise.id}`] = null)
  );
  return update(dbRef, updates);
};

const getLogHistory = async (userId, exerciseId) => {
  return get(child(dbRef, `/exercises/${userId}/${exerciseId}/log`));
};

const saveLogData = async (userId, exerciseId, workoutDate, data) => {
  const updates = {};
  updates[`/exercises/${userId}/${exerciseId}/log/${workoutDate}`] = data;
  return await update(dbRef, updates);
};

export {
  getWorkouts,
  getExercises,
  addWorkout,
  deleteWorkout,
  addExercise,
  deleteExercise,
  deleteAllExercises,
  getLogHistory,
  saveLogData,
  renameWorkout,
};
