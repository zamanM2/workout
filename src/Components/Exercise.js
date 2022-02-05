import React, { useState } from "react";
import Form from "./Form";
import Log from "./Log";
import "../App.css";

const Exercise = (props) => {
  const [allEntries, setAllEntries] = useState([]);
  const [logSetInput, setLogSetInput] = useState({ reps: 0, weight: 0 });

  const handleChange = (event) => {
    setLogSetInput({ ...logSetInput, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setAllEntries([...allEntries, { ...logSetInput, id: Date.now() }]);
  };

  const handleDeleteReps = (myId) => {
    //debugger;
    console.log(myId);
    setAllEntries(allEntries.filter((row) => row.id !== myId));
  };

  return (
    <div>
      {props.exercise.exercise}
      <button onClick={() => props.onDeleteExercise()} type="submit">
        X
      </button>
      <div style={mystyle}>
        <Form
          onChange={handleChange}
          logSet={logSetInput}
          onSubmit={handleSubmit}
        />
        <Log onDeleteReps={handleDeleteReps} entries={allEntries} />
      </div>
    </div>
  );
};

const mystyle = {
  padding: "15px",
};

export default Exercise;
