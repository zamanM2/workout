import { dbRef } from "./FirebaseConfig";
import { child, get, push, remove, update } from "firebase/database";

let getUser = () => {
  return "123";
};

const userId = getUser();

const getWorkouts = async () => {
  const snapshot = await get(child(dbRef, `/workouts/${userId}`));
  let keys = Object.keys(snapshot.val());
  return keys.map((_id) => {
    return { ...snapshot.val()[_id], id: _id };
  });
};

const getExercises = async () => {
  const snapshot = await get(child(dbRef, `/exercises/${userId}`));
  let keys = Object.keys(snapshot.val());
  return keys.map((_id) => {
    return { ...snapshot.val()[_id], id: _id };
  });
};

const saveWorkout = async (workout) => {
  return push(child(dbRef, `/workouts/${userId}`), {
    name: workout,
    sort: 1,
  });
};

const deleteWorkout = async (workoutId) => {
  return remove(child(dbRef, `/workouts/${userId}/${workoutId}`));
};

const saveExercise = async (exercise, _workoutId) => {
  return push(child(dbRef, `/exercises/${userId}`), {
    name: exercise,
    workoutId: _workoutId,
    sort: 1,
  });
};

const deleteExercise = async (exerciseId) => {
  return remove(child(dbRef, `/exercises/${userId}/${exerciseId}`));
};

const deleteAllExercises = async (allExercises) => {
  const updates = {};
  allExercises.forEach(
    (exercise) => (updates[`/exercises/${userId}/${exercise.id}`] = null)
  );
  return update(dbRef, updates);
};

const getLogHistory = async (exerciseId) => {
  return get(child(dbRef, `/exercises/${userId}/${exerciseId}/log`));
};

const saveLogData = async (exerciseId, workoutDate, data) => {
  const updates = {};
  updates[`/exercises/${userId}/${exerciseId}/log/${workoutDate}`] = data;
  return update(dbRef, updates);
};

export {
  getWorkouts,
  getExercises,
  saveWorkout,
  deleteWorkout,
  saveExercise,
  deleteExercise,
  deleteAllExercises,
  getLogHistory,
  saveLogData,
};
