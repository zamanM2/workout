import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { useTimer } from "../Context/TimerContext";
import Button from "react-bootstrap/Button";
import { useAuth } from "../Context/AuthContext";
import { updateTimerSettings } from "../Firebase/WorkoutApi";
import ChangeTimerModal from "./Modals/InputModal";

const Settings = () => {
  const [showTimerRenameModal, setShowTimerRenameModal] = useState(false);
  const { currentUser } = useAuth();
  const { timer } = useTimer();

  const onHandleChangeTimerLength = (event, newTimerLength) => {
    event.preventDefault();
    updateTimerSettings(currentUser.uid, newTimerLength);
  };

  const renameExerciseModalInfo = {
    title: "Change Rest Timer Length",
    body: "New Time in seconds:",
    visibility: showTimerRenameModal,
    okBtn: onHandleChangeTimerLength,
    hideModal: () => {
      setShowTimerRenameModal(false);
    },
    showModal: () => {
      setShowTimerRenameModal(true);
    },
  };

  return (
    <Container>
      <Container className="d-flex">
        <h4 className="">Rest Timer: {timer}s</h4>
        <Button
          onClick={renameExerciseModalInfo.showModal}
          style={{ marginLeft: "5px" }}
          className=""
        >
          Change
        </Button>
        <ChangeTimerModal info={renameExerciseModalInfo} />
      </Container>
      <Container>
        <h4>Email: {currentUser.email}</h4>
      </Container>
    </Container>
  );
};

export default Settings;
