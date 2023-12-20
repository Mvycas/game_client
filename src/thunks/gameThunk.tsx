import { Dispatch } from "redux";
import {
  SAVE_BOARD,
  GAME_STARTED,
  REQ_FAILED,
  GAME_END,
  SAVE_BOARD_REQ,
} from "../constants/gameConstants";

export const saveBoard = (
  randomColorArrangement: any,
  gameId: number,
  userToken: string,
  timeLeft: number,
  username: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      console.log(randomColorArrangement);

      dispatch({
        type: SAVE_BOARD_REQ,
      });
      const response = await fetch(
        `http://localhost:9090/games/${gameId}?token=${userToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: randomColorArrangement.score,
            userToken,
            username,
          }),
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
        type: REQ_FAILED, 
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

interface Game {
  username: string;
  score: number;
  completed: boolean;
}

export const getScoreboard =
  (currentUserUsername: string, userToken: string) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:9090/games?token=${userToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const games = await response.json();

        // Filter only completed games
        const completedGames = games.filter((game: Game) => game.completed);

        // Sort all scores in descending order
        completedGames.sort((a: Game, b: Game) => b.score - a.score);

        // Use a Set to remove duplicate scores
        const seenScores = new Set();
        const uniqueScores = completedGames.filter((game: Game) => {
          const duplicate = seenScores.has(game.score);
          seenScores.add(game.score);
          return !duplicate;
        });

        // Get the top scores and user scores after removing duplicates
        const topScores = uniqueScores.slice(0, 10);
        const userScores = uniqueScores
          .filter((game: Game) => game.username === currentUserUsername)
          .slice(0, 3);

        dispatch({
          type: "GET_SCOREBOARD_SUCCESS",
          payload: { topScores, userScores },
        });
      } else {
        throw new Error("Failed to fetch game data");
      }
    } catch (error: any) {
      dispatch({
        type: "GET_SCOREBOARD_FAILED",
        payload: error.message || "Unknown error occurred",
      });
    }
  };
