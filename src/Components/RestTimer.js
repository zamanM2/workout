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
  const soundEffect = new Audio();

  useEffect(async () => {
    const snapshotTimerValue = await getTimerSettings(currentUser.uid);
    setSecondsLeft(snapshotTimerValue.val());
  }, []);

  useEffect(() => {
    if (secondsLeft >= 0 && isCountingDown) {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      if (secondsLeft === 0) {
        soundEffect.autoplay = true;

        // onClick of first interaction on page before I need the sounds
        // (This is a tiny MP3 file that is silent and extremely short - retrieved from https://bigsoundbank.com and then modified)
        soundEffect.src =
          "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

        soundEffect.src = sound;
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
    soundEffect.autoplay = true;

    // onClick of first interaction on page before I need the sounds
    // (This is a tiny MP3 file that is silent and extremely short - retrieved from https://bigsoundbank.com and then modified)
    soundEffect.src =
      "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

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
