import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Popup = ({ info }) => {
  return (
    <>
      <Modal show={info.visibility} onHide={info.hideModal}>
        <Modal.Header>
          <Modal.Title>{info.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{info.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={info.hideModal}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#ff4500" }}
            variant="primary"
            onClick={info.okBtn}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;
