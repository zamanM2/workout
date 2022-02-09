import React, { useState } from "react";
import LogForm from "./LogForm";
import LogTable from "./LogTable";
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
    setLogEntries(logEntries.filter((row) => row.id !== myId));
  };

  return (
    <div>
      {props.exercise.name}
      <button
        className="xBtn"
        onClick={() => props.onDeleteExercise()}
        type="submit"
      >
        X
      </button>
      <div style={mystyle}>
        <LogForm
          onChange={handleInputChange}
          onSubmit={handleInputSubmit}
          logSet={logInput}
        />
        <LogTable onDeleteReps={handleDeleteReps} entries={logEntries} />
      </div>
    </div>
  );
};

const mystyle = {
  padding: "15px",
};

export default Exercise;
