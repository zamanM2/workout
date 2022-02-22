import React, { useState, useEffect } from "react";
import { BiAlarm } from "react-icons/bi";

const Timer = () => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    if (secondsLeft > 0 && isCountingDown) {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });

  const handleClick = () => {
    setSecondsLeft(60);
    if (!isCountingDown) {
      setIsCountingDown(true);
    } else {
      setIsCountingDown(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{ marginRight: "12px" }}
        className="timerbutton"
      >
        {secondsLeft}
      </button>
      <BiAlarm style={{ fontSize: "30px" }} />
    </>
  );
};

export default Timer;
