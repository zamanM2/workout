import React, { useState, useEffect } from "react";
import LogForm from "./LogForm";
import LogTable from "./LogTable";
import "../App.css";
import "../css/xBtn.css";
import HistoryLog from "./HistoryLog";
import { getLogHistory, saveLogData } from "../Firebase/WorkoutApi";

const Exercise = (props) => {
  const [logEntries, setLogEntries] = useState([]);
  const [logInput, setLogInput] = useState({ reps: "", weight: "" });
  const [logHistory, setLogHistory] = useState([]);

  const getTodaysDate = () => {
    let todaysDate = new Date();
    const offset = todaysDate.getTimezoneOffset();
    todaysDate = new Date(todaysDate.getTime() - offset * 60 * 1000);
    return todaysDate.toISOString().split("T")[0]; //yyyy-mm-dd
  };

  useEffect(() => {
    async function fetchLogData() {
      await getLogHistory(props.exercise.id)
        .then((snapshot) => {
          let keys = Object.keys(snapshot.val());
          let todaysDate = getTodaysDate();
          if (keys[keys.length - 1] === todaysDate) {
            setLogEntries(snapshot.val()[keys[keys.length - 1]]);
          }
          if (keys[keys.length - 1] !== todaysDate) {
            setLogHistory(snapshot.val()[keys[keys.length - 1]]);
          } else if (keys.length > 1) {
            setLogHistory(snapshot.val()[keys[keys.length - 2]]);
          }
        })
        .catch(() => {});
    }
    fetchLogData();
  }, [props.exercise.id]);

  const handleInputChange = (event) => {
    setLogInput({ ...logInput, [event.target.name]: event.target.value });
  };
  const handleLogSubmit = (event) => {
    event.preventDefault();
    if (logInput.reps.trim() === "" || logInput.weight.trim() === "") return;
    const dataToSave = [...logEntries, { ...logInput, id: Date.now() }];
    let todaysDate = getTodaysDate();
    saveLogData(props.exercise.id, todaysDate, dataToSave).then(() => {
      setLogEntries(dataToSave);
    });
  };

  const handleDeleteReps = (myId) => {
    const dataToSave = logEntries.filter((row) => row.id !== myId);
    let todaysDate = getTodaysDate();
    saveLogData(props.exercise.id, todaysDate, dataToSave).then(() => {
      setLogEntries(dataToSave);
    });
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
