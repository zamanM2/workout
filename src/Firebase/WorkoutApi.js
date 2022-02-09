import { dbRef } from "./FirebaseConfig";
import { get, child } from "firebase/database";

let getUser = () => {
  return "123";
};

const userId = getUser();

const getWorkouts = () => {
  get(child(dbRef, `/workouts/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  // .then((snapshot) => {
  //   snapshot.val();
  // });
  // return data;
  // .then((snapshot) => {
  //  console.log(snapshot.val());
  // return snapshot.val();
};

const getExercises = () => {
  get(child(dbRef, `/exercises/${userId}`)).then((snapshot) => {
    console.log(snapshot.val());
  });
};

// const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('foo');
//     }, 300);
//   });

//   myPromise
//     .then(handleResolvedA, handleRejectedA)
//     .then(handleResolvedB, handleRejectedB)
//     .then(handleResolvedC, handleRejectedC);

export { getWorkouts, getExercises };
