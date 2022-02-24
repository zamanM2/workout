import React, { createContext, useContext, useState, useEffect } from "react";
import { getTimerSettings } from "../Firebase/WorkoutApi";
import { useAuth } from "./AuthContext";

const TimerContext = createContext({});

export function useTimer() {
  return useContext(TimerContext);
}

const TimerProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [timer, setTimer] = useState();

  useEffect(async () => {
    const snapshotTimerValue = await getTimerSettings(currentUser.uid);
    setTimer(snapshotTimerValue.val());
  }, []);

  const contextValue = { timer, setTimer };

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
