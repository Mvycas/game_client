import { initializeConnect } from 'react-redux/es/components/connect';
import { SAVE_BOARD, GAME_STARTED, REQ_FAILED, GAME_END, PAUSE_GAME, RESUME_GAME } from '../constants/gameConstants';

interface GameBoard {
    w: number;       // Width of the board
    h: number;       // Height of the board
    tiles: string[][];
    score: number;  
}

interface GameState {
    isRunning: boolean; 
    isEnd: boolean; 
    startTime: any;
    totalTime: number;
    remainingTime: number;
    error: string;
    board: GameBoard;  
    gameId: number; 
}

// Pre-game (not started): isRunning === false, isEnd === false.
// In-game (currently active): isRunning === true, isEnd === false.
// Post-game (finished): isRunning === false, isEnd === true.

const initialState: GameState = {
    isRunning: false, // is game running or finished? in server it would be this prop "Completed"
    isEnd: false,
    error: "",
    gameId: -1,
    startTime: null,
    totalTime: 0, 
    remainingTime: 0,
    board: {
      w: 0, 
      h: 0, 
      tiles: [],
      score: 0
    },
  };

const boardReducer = (state: GameState = initialState, action: any) => {
  switch (action.type) {
    case GAME_STARTED:
      return { ...state, isRunning: true, board: action.payload.randomColorArrangement, 
        gameId: action.payload.GameDetails.id,
        startTime: action.payload.startTime,
        totalTime: action.payload.timeAllocated,
        remainingTime: action.payload.totalTime,
      };
    case SAVE_BOARD:
      return { ...state, board: action.payload.randomColorArrangement, remainingTime: action.payload.timeLeft};
    case REQ_FAILED:
      return { ...state, error: action.payload };
    case GAME_END:
      return { ...state, isEnd: true, isRunning: false, remainingTime: 0}; // Reset to initial state + add true flag to inform that the game is completed
    case PAUSE_GAME:
      return {...state, isRunning: false, remainingTime: action.payload.remainingTime};
    case RESUME_GAME:
      return {...state, isRunning: true};
    default:
      return state;
  }
}

export default boardReducer;
