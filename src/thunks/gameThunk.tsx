import { Dispatch } from "redux";
import {
  SAVE_BOARD,
  GAME_STARTED,
  REQ_FAILED,
  GAME_END,
  GET_UNFINISHED_GAME_SUCCESS,
  GET_UNFINISHED_GAME_FAILED,
  REQ_UNFINISHED_GAME,
  SAVE_BOARD_REQ
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
      dispatch({
        type: SAVE_BOARD_REQ,
      });
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
          payload: { randomColorArrangement, timeLeft },
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
  (randomColorArrangement: any, userToken: string, timeAllocated: number) =>
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

export const getIncompleteGamesByUserId =
  (userId: any, userToken: any) => async (dispatch: Dispatch) => {
    try {
      //Retrieve the list of games
      const response = await fetch(
        `http://localhost:9090/games?token=${userToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      const games = await response.json();

      const incompleteGame = games.find(
        (game: any) => !game.completed && game.user === userId
      );

      if (incompleteGame) {
        dispatch({
          type: GET_UNFINISHED_GAME_SUCCESS,
          payload: {
            gameId: incompleteGame.id,
            remainingTime: incompleteGame.timeLeft,
            score: incompleteGame.score,
          },
        });
      } else {
        // Handle the case where no incomplete games are found
      }
    } catch (error) {
      console.error("Error retrieving incomplete game:", error);
    }
  };
