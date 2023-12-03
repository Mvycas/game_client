import { Dispatch } from "redux";
import {SAVE_BOARD, GAME_STARTED} from "../constants/gameConstants";

export const startNewGame = (randomColorArrangement : any) => {
    return (dispatch: Dispatch) => {
      dispatch({
        type: GAME_STARTED,
        payload: randomColorArrangement,
      });
    };
  };

  export const saveBoard = (ColorArrangement : any) => {
    return (dispatch: Dispatch) => {
      dispatch({
        type: SAVE_BOARD,
        payload: ColorArrangement,
      });
    };
  };