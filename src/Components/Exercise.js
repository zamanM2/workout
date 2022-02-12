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

  const getTodaysDate = () => {
    let todaysDate = new Date();
    const offset = todaysDate.getTimezoneOffset();
    todaysDate = new Date(todaysDate.getTime() - offset * 60 * 1000);
    return todaysDate.toISOString().split("T")[0]; //yyyy-mm-dd
  };

  useEffect(() => {
    async function fetchLogHistory() {
      await getLogHistory(props.exercise.id)
        .then((snapshot) => {
          if (snapshot == null) return;
          let keys = Object.keys(snapshot.val());
          let todaysDate = getTodaysDate();
          if (keys.length > 0 && keys[keys.length - 1] !== todaysDate) {
            setLogHistory(snapshot.val()[keys[keys.length - 1]]);
          } else if (keys.length > 1) {
            setLogHistory(snapshot.val()[keys[keys.length - 2]]);
          }
        })
        .catch(() => {});
    }
    fetchLogHistory();
  }, []);

  const handleInputChange = (event) => {
    setLogInput({ ...logInput, [event.target.name]: event.target.value });
  };
  const handleLogSubmit = async (event) => {
    event.preventDefault();
    const logObject = {};
    setLogEntries([...logEntries, { ...logInput, id: Date.now() }]);
    for (let i = 0; i < logEntries.length; i++) {
      logObject[i] = logEntries[i];
    }
    let todaysDate = getTodaysDate();
    await saveLogData(props.exercise.id, todaysDate, logObject);
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

export default Exercise;

const mystyle = {
  padding: "15px",
};
