import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmq-xoaZC3s7N9-sNBg8wiEW-bbaFUjeA",
  authDomain: "gainz-db.firebaseapp.com",
  databaseURL: "https://gainz-db-default-rtdb.firebaseio.com",
  projectId: "gainz-db",
  storageBucket: "gainz-db.appspot.com",
  messagingSenderId: "714005148405",
  appId: "1:714005148405:web:327253dd8c25a4decdcbbc",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

export { dbRef };
