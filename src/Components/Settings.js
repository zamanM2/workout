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
        <h3 className="">Timer Length: {timer}s</h3>
        <Button style={{ marginLeft: "5px" }} className="">
          Change
        </Button>
      </Container>
      <Container>
        <h3>Email: {currentUser.email}</h3>
      </Container>
    </Container>
  );
};

export default Settings;
