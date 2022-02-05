import React from "react";
import "../App.css";
import LogRow from "./LogRow";

const Log = (props) => {
  return (
    <div className="repweight">
      <table style={tableStyle}>
        <tbody>
        <tr>
          <th>Reps</th>
          <th>Weight</th>
          {/* <br /> */}
        </tr>
        {props.entries.map((_element) => (

          <LogRow onDeleteReps={props.onDeleteReps} key = {_element.id} element={_element} />
          // <tr>
          //   <td style={tableStyle}>{element.reps}</td>
          //   <td style={tableStyle}>{element.weight}</td>
          //   <td> <button onSubmit = { props.onDeleteReps()} type ="submit" > X </button></td>
           
          // </tr>
        ))}
        </tbody>
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
