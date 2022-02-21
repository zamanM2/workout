import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import MyselfForm from "./MyselfForm";

const MySelf = () => {
  const [inputData, setInputData] = useState({
    weight: "",
    bodyFat: "",
  });
  const [myData, setMyData] = useState([]);

  const handleInputDataChange = ({ target }) => {
    setInputData({ ...inputData, [target.name]: target.value });
  };

  const getTodaysDate = () => {
    let todaysDate = new Date();
    const offset = todaysDate.getTimezoneOffset();
    todaysDate = new Date(todaysDate.getTime() - offset * 60 * 1000);
    return todaysDate.toISOString().split("T")[0]; //yyyy-mm-dd
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const todaysDate = getTodaysDate();
    setMyData([...myData, { todaysDate: inputData }]);
  };

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
