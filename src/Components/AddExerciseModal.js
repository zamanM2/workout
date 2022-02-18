import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";

const AddExerciseModal = (props) => {
  const [exerciseInput, setExerciseInput] = useState("");

  const handleInputChange = (event) => {
    setExerciseInput(event.target.value);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Add Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            onChange={handleInputChange}
            value={exerciseInput}
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
          onClick={(event)=>{
            props.onHandleAddExercise(event, exerciseInput);
            props.onHide();
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExerciseModal;
