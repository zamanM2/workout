import React from "react";
import "../App.css";
import "../css/blackBtn.css";

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="reps">
        Reps
        <input
          onChange={props.onChange}
          type="text"
          name="reps"
          style={inputStyle}
          value={props.logSet.reps}
        />
        Weight
        <input
          onChange={props.onChange}
          type="text"
          name="weight"
          style={inputStyle}
          value={props.logSet.weight}
        />
      </div>

      <button className="blackBtn" type="submit">
        Log
      </button>
    </form>
  );
};

export default Form;

const inputStyle = {
  width: "50px",
  marginRight: "15px",
  marginLeft: "5px",
};
