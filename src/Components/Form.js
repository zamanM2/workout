import react from "react";
import "../App.css";

const Form = (props) => {
  return (
    <form className="bigtable" onSubmit={props.onSubmit}>
      <div className="reps">
        Reps
        <input
          onChange={props.onChange}
          type="text"
          name="reps"
          value={props.logSet.reps}
        />
        Weight
        <input
          onChange={props.onChange}
          type="text"
          name="weight"
          value={props.logSet.weight}
        />
      </div>

      <button type="submit">Log</button>
    </form>
  );
};

export default Form;
