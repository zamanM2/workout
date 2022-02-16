import React from "react";
import "../App.css";

const LogTable = (props) => {
  return (
    <div className="float-end">
      <h5>Today</h5>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th> </th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
          {props.entries.map((element) => (
            <tr key={element.id}>
              <td>
                <button
                  onClick={() => props.onDeleteReps(element.id)}
                  type="submit"
                >
                  X
                </button>
              </td>
              <td style={tableStyle}>{element.reps}</td>
              <td style={tableStyle}>{element.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;

const tableStyle = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
};
