import React from "react";
import "../App.css";
import "../css/blackBtn.css";

const LogForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="reps">
        Reps
        <input
          maxLength="4"
          className=" repInput"
          onChange={props.onChange}
          type="number"
          name="reps"
          style={inputStyle}
          value={props.logSet.reps}
        />
        Weight
        <input
          maxLength="4"
          className=" repInput"
          onChange={props.onChange}
          type="number"
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

export default LogForm;

const inputStyle = {
  width: "65px",
  lineHeight: "14px",
  marginRight: "15px",
  marginLeft: "5px",
};
