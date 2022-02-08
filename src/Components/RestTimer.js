import React, { useState, useEffect } from "react";

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
    <button onClick={handleClick} className="timerbutton">
      {secondsLeft}
    </button>
  );
};

export default Timer;
