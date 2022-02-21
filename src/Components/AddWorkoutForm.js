import React, { useState } from "react";
import { ImCheckmark, ImCross, ImPlus } from "react-icons/im";
import Container from "react-bootstrap/Container";
import "../css/blackBtn.css";

const AddWorkoutForm = (props) => {
  const [showWorkoutButton, setShowWorkoutButton] = useState(true);

  return (
    <Container style={{ margin: "5px" }}>
      {showWorkoutButton ? (
        <button
          style={{ fontSize: "18px", padding: "15px" }}
          onClick={() => {
            setShowWorkoutButton(false);
          }}
          className="blackBtn"
          type="submit"
        >
          + Workout
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
              style={{ height: "32px" }}
              className="addWorkoutInput"
              placeholder="Add Workout"
              onChange={props.handleInputChange}
              value={props.newWorkout}
              type="text"
              name="workout"
            />
            <button className="blackBtn" type="Submit">
              <ImCheckmark />
            </button>
            <button
              className="blackBtn"
              onClick={() => {
                setShowWorkoutButton(true);
              }}
            >
              <ImCross />
            </button>
          </form>
        </>
      )}
    </Container>
  );
};

export default AddWorkoutForm;
