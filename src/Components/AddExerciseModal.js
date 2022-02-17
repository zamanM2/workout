import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";

const AddExerciseModal=(props)=>{
    return (
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header >
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              //   onChange={this.handleChange}
              //   value={this.state.name}
              
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick ={props.onHide} variant="secondary" >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            // onClick={() => this.props.handleSubmit(this.state.name)}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default AddExerciseModal;