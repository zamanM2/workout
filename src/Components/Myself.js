import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import MyselfForm from "./MyselfForm";
import MyselfLog from "./MyselfLog";
import { getUserData } from "../Firebase/WorkoutApi";
import { useAuth } from "../Context/AuthContext";

function dateCompare(a, b) {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
}

const MySelf = () => {
  const [inputData, setInputData] = useState({
    weight: "",
    bodyFat: "",
  });
  const [myData, setMyData] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getUserData(currentUser.uid).then((data) => {
      setMyData(data.sort(dateCompare));
    });
  }, []);

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
