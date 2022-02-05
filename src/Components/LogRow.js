import React from "react";

const LogRow=(props)=>{
    return(
    <> 
        <tr>
        <td style={tableStyle}>{props.element.reps}</td>
        <td style={tableStyle}>{props.element.weight}</td>
        <td> <button onSubmit={props.onDeleteReps}type ="submit" > X </button></td>
       
      </tr>
    </>
    )
}

const tableStyle = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
};

export default LogRow;