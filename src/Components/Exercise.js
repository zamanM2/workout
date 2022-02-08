import React, { useState } from "react";
import Form from "./Form";
import Log from "./Log";
import "../App.css";
import "../css/xBtn.css";

const Exercise = (props) => {
  const [logEntries, setLogEntries] = useState([]);
  const [logInput, setLogInput] = useState({ reps: 0, weight: 0 });

  const handleInputChange = (event) => {
    setLogInput({ ...logInput, [event.target.name]: event.target.value });
  };
  const handleInputSubmit = (event) => {
    event.preventDefault();
    setLogEntries([...logEntries, { ...logInput, id: Date.now() }]);
  };

  const handleDeleteReps = (myId) => {
    console.log(myId);
    setLogEntries(logEntries.filter((row) => row.id !== myId));
  };

  return (
    <div>
      {props.exercise.exercise}
      <button
        className="xBtn"
        onClick={() => props.onDeleteExercise()}
        type="submit"
      >
        X
      </button>
      <div style={mystyle}>
        <Form
          onChange={handleInputChange}
          onSubmit={handleInputSubmit}
          logSet={logInput}
        />
        <Log onDeleteReps={handleDeleteReps} entries={logEntries} />
      </div>
    </div>
  );
};

const mystyle = {
  padding: "15px",
};

export default Exercise;
