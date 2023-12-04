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
    return async (dispatch: Dispatch) => {
      dispatch({
        // fetch() DONT DO THAT / DISPATCH THUNK ACTION AND MAKE THUNK FOR ADDING BOARD TO GAMESERV
        type: SAVE_BOARD,
        payload: ColorArrangement,
      });
      // dispatch ....
    };
  };