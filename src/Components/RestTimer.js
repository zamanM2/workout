import React, { useState, useEffect } from "react";
import { BiAlarm } from "react-icons/bi";
import { useTimer } from "../Context/TimerContext";
import { getTimerSettings } from "../Firebase/WorkoutApi";
import { useAuth } from "../Context/AuthContext";
import sound from "../timerSound.mp3";

const Timer = () => {
  const { timer } = useTimer();
  const { currentUser } = useAuth();
  const [secondsLeft, setSecondsLeft] = useState();
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(async () => {
    const snapshotTimerValue = await getTimerSettings(currentUser.uid);
    setSecondsLeft(snapshotTimerValue.val());
  }, []);

  useEffect(() => {
    if (secondsLeft > 0 && isCountingDown) {
      if (secondsLeft === 1) {
        const audioTune = new Audio(sound);
        audioTune.play();
      }
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });

  const handleClick = () => {
    setSecondsLeft(timer);
    if (!isCountingDown) {
      setIsCountingDown(true);
      setSecondsLeft(secondsLeft - 1);
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
