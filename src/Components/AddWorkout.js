import React, { useState } from "react";

const AddWorkout = (props) => {
  const [showWorkoutButton, setShowWorkoutButton] = useState(true);

  return (
    <>
      {showWorkoutButton ? (
        <button
          onClick={() => {
            setShowWorkoutButton(false);
          }}
          className="addWorkout"
          type="submit"
        >
          Add Workout
        </button>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              props.handleAddWorkout(e);
              setShowWorkoutButton(true);
            }}
          >
            <input
              onChange={props.handleInputChange}
              value={props.newWorkout}
              type="text"
              name="workout"
            />
            <button type="Submit">✔</button>
            <button
              onClick={() => {
                setShowWorkoutButton(true);
              }}
            >
              ❌
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default AddWorkout;
