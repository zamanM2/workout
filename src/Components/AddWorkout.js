import React from "react";

const AddWorkout = (props) => {
  return (
    <>
      {props.showWorkoutButton ? (
        <button
          onClick={() => {
            props.setShowWorkoutButton(false);
          }}
          className="addWorkout"
          type="submit"
        >
          Add Workout
        </button>
      ) : (
        <form onSubmit={props.handleAddWorkout}>
          <input
            onChange={props.handleInputChange}
            value={props.newWorkout}
            type="text"
            name="workout"
          />
          <button type="Submit">✔</button>
          <button
            onClick={() => {
              props.setShowWorkoutButton(true);
            }}
          >
            ❌
          </button>
        </form>
      )}
    </>
  );
};

export default AddWorkout;
