import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import MyselfForm from "./MyselfForm";

const MySelf = () => {
  const [inputData, setInputData] = useState({
    weight: "",
    bodyFat: "",
  });

  const handleInputDataChange = ({ target }) => {
    setInputData({ ...inputData, [target.name]: target.value });
  };

  const handleSubmit = () => {};

  return (
    <Container>
      <MyselfForm
        onInputChange={handleInputDataChange}
        inputData={inputData}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default MySelf;
