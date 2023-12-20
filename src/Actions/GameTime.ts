// Redux actions

import { Dispatch } from "redux";

export const pauseGame = (remainingTime:number) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: 'PAUSE_GAME', payload: remainingTime }); 
    };
  };
  
export const resumeGame = () => {
    return (dispatch: Dispatch) => {
      dispatch({ type: 'RESUME_GAME' });
    };
  };



  