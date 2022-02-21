import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MyselfForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          onChange={props.onInputChange}
          type="text"
          name="weight"
          placeholder="Weight"
          value={props.inputData.weight}
        />
        <br />
        <Form.Label>Body Fat</Form.Label>
        <Form.Control
          type="text"
          name="bodyFat"
          onChange={props.onInputChange}
          placeholder="Body Fat"
          value={props.inputData.bodyFat}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log
      </Button>
    </Form>
  );
};

export default MyselfForm;
