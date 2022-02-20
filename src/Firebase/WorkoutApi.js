import { dbRef } from "./FirebaseConfig";
import { child, get, push, remove, update } from "firebase/database";

let getUser = () => {
  return "pvTXt2ruj6e6tu47Nbwx76kMvzp1";
};

const getWorkouts = async () => {
  const userId = getUser();
  const snapshot = await get(child(dbRef, `/workouts/${userId}`));
  let keys = Object.keys(snapshot.val());
  return keys.map((_id) => {
    return { ...snapshot.val()[_id], id: _id };
  });
};

const getExercises = async () => {
  const userId = getUser();
  const snapshot = await get(child(dbRef, `/exercises/${userId}`));
  let keys = Object.keys(snapshot.val());
  return keys.map((_id) => {
    return { ...snapshot.val()[_id], id: _id };
  });
};

const addWorkout = async (workout) => {
  const userId = getUser();
  return push(child(dbRef, `/workouts/${userId}`), {
    name: workout,
    sort: 1,
  });
};

const deleteWorkout = async (workoutId) => {
  const userId = getUser();
  return remove(child(dbRef, `/workouts/${userId}/${workoutId}`));
};

const renameWorkout = async (workout, newName) => {
  const userId = getUser();
  const updates = {};
  updates[`/workouts/${userId}/${workout.id}`] = {
    name: workout.name,
    sort: workout.sort,
  };
  return update(dbRef, updates);
};

const addExercise = async (exercise, _workoutId) => {
  const userId = getUser();
  return push(child(dbRef, `/exercises/${userId}`), {
    name: exercise,
    workoutId: _workoutId,
    sort: 1,
  });
};

const deleteExercise = async (exerciseId) => {
  const userId = getUser();
  return remove(child(dbRef, `/exercises/${userId}/${exerciseId}`));
};

const deleteAllExercises = async (allExercises) => {
  const userId = getUser();
  const updates = {};
  allExercises.forEach(
    (exercise) => (updates[`/exercises/${userId}/${exercise.id}`] = null)
  );
  return update(dbRef, updates);
};

const getLogHistory = async (exerciseId) => {
  const userId = getUser();
  return get(child(dbRef, `/exercises/${userId}/${exerciseId}/log`));
};

const saveLogData = async (exerciseId, workoutDate, data) => {
  const userId = getUser();
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
