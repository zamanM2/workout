import { dbRef } from "./FirebaseConfig";
import { get, child } from "firebase/database";

let getUser = () => {
  return "123";
};

const userId = getUser();

const getWorkouts = () => {
  return get(child(dbRef, `/workouts/${userId}`));
};

const getExercises = () => {
  get(child(dbRef, `/exercises/${userId}`)).then((snapshot) => {
    console.log(snapshot.val());
  });
};

export { getWorkouts, getExercises };
