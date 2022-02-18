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
    <Modal show={props.info.visibility} onHide={props.info.hideModal}>
      <Modal.Header>
        <Modal.Title>{props.info.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>{props.info.body}</Form.Label>
          <Form.Control
            type="text"
            onChange={handleInputChange}
            value={exerciseInput}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.info.hideModal} variant="secondary">
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            props.info.okBtn(event, exerciseInput);
            props.info.hideModal();
            setExerciseInput("");
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExerciseModal;
