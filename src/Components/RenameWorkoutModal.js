import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";

const RenameWorkoutModal = (props) => {
  const [renameWorkout, setRenameWorkout] = useState("");

  const handleInputChange = (event) => {
    setRenameWorkout(event.target.value);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Rename Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>New name: </Form.Label>
          <Form.Control
            type="text"
            onChange={handleInputChange}
            value={renameWorkout}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            props.onHandleRenameWorkout(event, props.workoutId, renameWorkout);
            props.onHide();
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameWorkoutModal;
