import React from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithRedirect } from "firebase/auth";



const Login = () => {
const loginWithGoogle =()=>{
const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithRedirect(auth, provider);
}
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
      <button onClick = {loginWithGoogle}> Login Google</button>
    </div>
  );
};

export default Login;
