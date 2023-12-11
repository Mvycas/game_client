// Redux actions

import { Dispatch } from "redux";

export const pauseGame = (startTime:number, totalTime:number) => {
    return (dispatch: Dispatch) => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000; 
      const remainingTime = Math.max(totalTime - elapsed, 0); 
      dispatch({ type: 'PAUSE_GAME', payload: { remainingTime } }); // Save remaining time
    };
  };
  
export const resumeGame = () => {
    return (dispatch: Dispatch) => {
      dispatch({ type: 'RESUME_GAME' });
    };
  };
  