import React, { useState } from "react";
import Form from "./Form";
import Log from "./Log";
import "../App.css";

const Exercise = (props) => {
  const [allEntries, setAllEntries] = useState([]);
  const [logSet, setLogSet] = useState({ reps: 0, weight: 0 });

  const handleChange = (event) => {
    // debugger
    setLogSet({ ...logSet, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    //  debugger
    event.preventDefault();
    setAllEntries([...allEntries, logSet]);
  };

  return (
    <div>
      {" "}
      {props.exercise.exercise}
      {/* <form onSubmit={props.handleDeleteExercise}> */}
      <button onClick={() => props.onDeleteExercise()} type="submit">
        {" "}
        X{" "}
      </button>
      {/* </form> */}
      <div style={mystyle}>
        <Form onChange={handleChange} logSet={logSet} onSubmit={handleSubmit} />

        <Log entries={allEntries} />
      </div>
    </div>
  );
};

const mystyle = {
  padding: "15px",
};

export default Exercise;
