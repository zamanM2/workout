import { dbRef } from "./FirebaseConfig";
import { get, child } from "firebase/database";

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

export { getWorkouts, getExercises };
