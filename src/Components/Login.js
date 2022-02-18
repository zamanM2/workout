import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";

let uid;

const Login = () => {
  // const [user, setUser] = useState = ({});
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const _user = result.user;
        // setUser(_user)
        console.log(_user.uid);
        uid = _user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="navbar">
      {/* <form>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form> */}
      <button className="googleButton" onClick={loginWithGoogle}>
        {" "}
        Login Google
      </button>
    </div>
  );
};

export { Login, uid };
