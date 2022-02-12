import { dbRef } from "./FirebaseConfig";
import { child, get, push, remove, update } from "firebase/database";

let getUser = () => {
  return "123";
};

const userId = getUser();

const getWorkouts = async () => {
  return get(child(dbRef, `/workouts/${userId}`));
};

const getExercises = async () => {
  return get(child(dbRef, `/exercises/${userId}`));
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

const getLogHistory = async(exerciseId)=>{
  return get(child(dbRef, `/exercises/${userId}/${exerciseId}/log`));
}

const saveLogData= async(exerciseId, workoutDate, data)=>{
  const updates = {} 
  console.log(workoutDate)
  console.log(exerciseId)
    updates[`/exercises/${userId}/${exerciseId}/log/${workoutDate}`] = data
  return update(dbRef, updates);
  
}

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
