import React from "react";
import "../App.css";

const Log = (props) => {
  return (
    <div className="repweight">
      <table style={tableStyle}>
        <tr>
          <th>Reps</th>
          <th>Weight</th>
          <br />
        </tr>
        {props.entries.map((element) => (
          <tr>
            <td style={tableStyle}>{element.reps}</td>
            <td style={tableStyle}>{element.weight}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Log;

const tableStyle = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
};
