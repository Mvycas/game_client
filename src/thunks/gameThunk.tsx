import { Dispatch } from "redux";
import {
  SAVE_BOARD,
  GAME_STARTED,
  REQ_FAILED,
  GAME_END,
} from "../constants/gameConstants";

export const saveBoard = (
  randomColorArrangement: any,
  gameId: number,
  userToken: string,
  score: number,
  timeLeft: number
) => {
  return async (dispatch: Dispatch) => {
    try {
      // Send a PATCH request to the server to update the game
      const response = await fetch(
        `http://localhost:9090/games/${gameId}?token=${userToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score, userToken, timeLeft }), //////////////////////////TIME LEFT MY CAUSE ERRORS ON BACKEND
        }
      );

      if (response.ok) {
        dispatch({
          type: SAVE_BOARD,
          payload: {randomColorArrangement, timeLeft}
        });
      } else {
        throw new Error("Failed to save board");
      }
    } catch (error: any) {
      dispatch({
        type: REQ_FAILED,
        payload: error.message || "Unknown error occurred",
      });
    }
  };
};

export const endGame = (gameId: number, userToken: string) => {
  return async (dispatch: Dispatch) => {
    const completed = true;
    try {
      const response = await fetch(
        `http://localhost:9090/games/${gameId}/?token=${userToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed }),
        }
      );
      if (response.ok) {
        dispatch({
          type: GAME_END,
        });
      } else {
        throw new Error("Failed to end game");
      }
    } catch (error: any) {
      dispatch({
        type: REQ_FAILED, // Adjust type based on your action types
        payload: error.message || "Unknown error occurred",
      });
    }
  };
};

export const startNewGame =
  (randomColorArrangement: any, userToken: string, timeAllocated: number, startTime: any) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:9090/games?token=${userToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const GameDetails = await response.json();
        dispatch({
          type: GAME_STARTED,
          payload: {
            randomColorArrangement,
            GameDetails,
            timeAllocated,
            startTime,
          },
        });
      } else {
        throw new Error("Failed to start a new game");
      }
    } catch (error: any) {
      dispatch({
        type: REQ_FAILED,
        payload: error.message || "Unknown error occurred",
      });
    }
  };
