import React, { useState, useEffect } from "react";
import { BiAlarm } from "react-icons/bi";
import { useTimer } from "../Context/TimerContext";
import { getTimerSettings } from "../Firebase/WorkoutApi";
import { useAuth } from "../Context/AuthContext";
import sound from "../timerSound.mp3";
import silence from "../silence.mp3";

const Timer = () => {
  const { timer } = useTimer();
  const { currentUser } = useAuth();
  const [secondsLeft, setSecondsLeft] = useState();
  const [isCountingDown, setIsCountingDown] = useState(false);
  const soundEffect = new Audio();

  useEffect(async () => {
    const snapshotTimerValue = await getTimerSettings(currentUser.uid);
    setSecondsLeft(snapshotTimerValue.val());
  }, []);

  useEffect(() => {
    if (secondsLeft >= 0 && isCountingDown) {
      soundEffect.src = sound;

      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      if (secondsLeft === 0) {
        soundEffect.autoplay = true;
        // const audioTune = new Audio(sound);
        // audioTune.autoplay = true;
        // audioTune.play();
        setSecondsLeft(timer);
        setIsCountingDown(false);
      }
      return () => clearTimeout(timerId);
    }
  });

  const handleClick = () => {
    soundEffect.src = sound;
    soundEffect.autoplay = true;
    soundEffect.play();
    soundEffect.pause();
    soundEffect.currentTime = 0;

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
