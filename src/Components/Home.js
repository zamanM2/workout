import React from "react";
import { Container } from "react-bootstrap";
import logo from "../images/WorkoutAnime.jpeg";

const Home = () => {
  return (
    <Container>
      <img className="workoutImg" src={logo} alt="img" />
      <h5 className="appHeader">FITNESS<br></br> SLAYERZ</h5>
    </Container>
  );
};

export default Home;
