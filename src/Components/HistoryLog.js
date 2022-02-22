import React from "react";

const HistoryLog = (props) => {
  return (
    <div className="float-start">
      <h5>{props.lastWorkoutDate}</h5>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={{ padding: "2px", borderLeft: "1px solid black" }}>
              Reps
            </th>
            <th style={{ padding: "2px", borderLeft: "1px solid black" }}>
              Weight
            </th>
          </tr>
          {props.history.map((element) => (
            <tr key={element.id}>
              <td style={tableStyle}>{element.reps}</td>
              <td style={tableStyle}>{element.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryLog;

const tableStyle = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
};
