import React from "react";
import Container from "react-bootstrap/Container";
import { useTimer } from "../Context/TimerContext";

const Settings = () => {
  const { timer } = useTimer();
  return <Container>{timer}</Container>;
};

export default Settings;
