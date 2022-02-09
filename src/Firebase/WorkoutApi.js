import { dbRef } from "./FirebaseConfig";
import { child, get, push } from "firebase/database";

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

export { getWorkouts, getExercises, saveWorkout };
