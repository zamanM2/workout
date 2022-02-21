import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import MyselfForm from "./MyselfForm";
import MyselfLog from "./MyselfLog";

const MySelf = () => {
  const [inputData, setInputData] = useState({
    weight: "",
    bodyFat: "",
  });
  const [myData, setMyData] = useState([
    { date: "2022-02-21", weight: "170", bodyFat: "15" },
  ]);

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
    // setMyData([...myData, { todaysDate: inputData }]);
  };

  return (
    <Container>
      <MyselfForm
        onInputChange={handleInputDataChange}
        inputData={inputData}
        onSubmit={handleSubmit}
      />
      <MyselfLog entries={myData} />
    </Container>
  );
};

export default MySelf;
