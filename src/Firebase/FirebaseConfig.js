// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmq-xoaZC3s7N9-sNBg8wiEW-bbaFUjeA",
  authDomain: "gainz-db.firebaseapp.com",
  databaseURL: "https://gainz-db-default-rtdb.firebaseio.com",
  projectId: "gainz-db",
  storageBucket: "gainz-db.appspot.com",
  messagingSenderId: "714005148405",
  appId: "1:714005148405:web:327253dd8c25a4decdcbbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const workoutRef = ref(db, "Chestday");
onValue(workoutRef, (snapshot) => {
  const data = snapshot.val();
console.log(data)
});

