import React, { useState, useEffect } from "react";
import LogForm from "./LogForm";
import LogTable from "./LogTable";
import "../App.css";
import "../css/xBtn.css";
import HistoryLog from "./HistoryLog";
import { getLogHistory, saveLogData } from "../Firebase/WorkoutApi";

const Exercise = (props) => {
  const [logEntries, setLogEntries] = useState([]);
  const [logInput, setLogInput] = useState({ reps: 0, weight: 0 });
  const [logHistory, setLogHistory] = useState([]);
  
  
  useEffect(() => {
    async function fetchLogHistory() {
      let snapshot = await getLogHistory(props.exercise.id);
      let keys = Object.keys(snapshot.val());
      //get local timezone
      let todaysDate = new Date();
      const offset = todaysDate.getTimezoneOffset();
      todaysDate = new Date(todaysDate.getTime() - offset * 60 * 1000);
      todaysDate = todaysDate.toISOString().split('T')[0]
      if (keys[keys.length - 1] !== todaysDate) {
        setLogHistory(snapshot.val()[keys[keys.length - 1]]);
      }
    }
    fetchLogHistory();
  }, []);

  const handleInputChange = (event) => {
    setLogInput({ ...logInput, [event.target.name]: event.target.value });
  };
  const handleLogSubmit = async(event) => {
    event.preventDefault();
    const logObject = {};
    
    setLogEntries([...logEntries, { ...logInput, id: Date.now() }]);
    
    for (let i = 0; i < logEntries.length; i++) {
      logObject[i] = logEntries[i];
    }
     let todaysDate = new Date();
      const offset = todaysDate.getTimezoneOffset();
      todaysDate = new Date(todaysDate.getTime() - offset * 60 * 1000);
      todaysDate = todaysDate.toISOString().split('T')[0]
      
    await saveLogData(props.exercise.id, todaysDate, logObject)
    
    // console.log(logObject);
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
          onSubmit={handleLogSubmit}
          logSet={logInput}
        />
        <LogTable onDeleteReps={handleDeleteReps} entries={logEntries} />
      </div>
      <HistoryLog history={logHistory} />
    </div>
  );
};

const mystyle = {
  padding: "15px",
};

export default Exercise;
