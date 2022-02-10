import { dbRef } from "./FirebaseConfig";
import { child, get, push, remove } from "firebase/database";

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

const saveExercise= async(exercise, _workoutId)=>{
  return push(child(dbRef, `/exercises/${userId}`), {
    name: exercise,
    workoutId: _workoutId,
    sort: 1,
  });
};

const deleteExercise = async(exerciseId)=>{
  remove(child(dbRef, `/exercises/${userId}/${exerciseId}`));
}

export { getWorkouts, getExercises, saveWorkout, deleteWorkout, saveExercise, deleteExercise };
