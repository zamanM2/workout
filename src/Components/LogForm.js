import React from "react";
import "../App.css";
import "../css/blackBtn.css";

const LogForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="reps">
        Reps
        <input
          className=" repInput"
          onChange={props.onChange}
          type="text"
          name="reps"
          style={inputStyle}
          value={props.logSet.reps}
        />
        Weight
        <input
          className=" repInput"
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

export default LogForm;

const inputStyle = {
  width: "50px",
  lineHeight: "14px",
  marginRight: "15px",
  marginLeft: "5px",
};
