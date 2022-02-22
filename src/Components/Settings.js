import React from "react";
import Container from "react-bootstrap/Container";
import { useTimer } from "../Context/TimerContext";
import Button from "react-bootstrap/Button";
import { useAuth } from "../Context/AuthContext";

const Settings = () => {
  const { currentUser } = useAuth();
  const { timer } = useTimer();

  return (
    <Container>
      <Container className="d-flex">
        <h4 className="">Rest Timer: {timer}s</h4>
        <Button style={{ marginLeft: "5px" }} className="">
          Change
        </Button>
      </Container>
      <Container>
        <h4>Email: {currentUser.email}</h4>
      </Container>
    </Container>
  );
};

export default Settings;
