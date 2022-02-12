import React from "react";

const HistoryLog = (props) => {
  return (
    <div className="repweight">
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
          {props.history.map((element) => (
            <tr>
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
