import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/blackBtn.css";

const MyselfForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
          style={{ fontSize: "18px", fontWeight: "500", marginTop: "5px" }}
        >
          Weight
        </Form.Label>
        <Form.Control
          onChange={props.onInputChange}
          name="weight"
          placeholder="Weight"
          type="number"
          step="0.01"
          maxLength="7"
          value={props.inputData.weight}
        />
        <br />
        <Form.Label style={{ fontSize: "18px", fontWeight: "500" }}>
          Body Fat Percentage
        </Form.Label>
        <Form.Control
          name="bodyFat"
          type="number"
          step="0.01"
          maxLength="7"
          onChange={props.onInputChange}
          placeholder="Body Fat"
          value={props.inputData.bodyFat}
        />
      </Form.Group>
      <Button className="blackBtn" variant="primary" type="submit">
        Log
      </Button>
    </Form>
  );
};

export default MyselfForm;

const label = { fontSize: "18px" };
