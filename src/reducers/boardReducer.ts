import { initializeConnect } from 'react-redux/es/components/connect';
import { SAVE_BOARD, GAME_STARTED, REQ_FAILED, GAME_END, PAUSE_GAME, CONTINUE_GAME } from '../constants/gameConstants';

interface GameBoard {
    w: number;       // Width of the board
    h: number;       // Height of the board
    tiles: string[][];
    score: number;  
}

interface GameState {
    isRunning: boolean; 
    isEnd: boolean; 
    timeLeft: number;
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
    timeLeft: 0,
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
      return { ...state, isRunning: true, board: action.payload.randomColorArrangement, gameId: action.payload.GameDetails.id, timeLeft: action.payload.timeLeft };
    case SAVE_BOARD:
      return { ...state, board: action.payload.randomColorArrangement, timeLeft: action.payload.timeLeft};
    case REQ_FAILED:
      return { ...state, error: action.payload };
    case GAME_END:
      return { ...state, isEnd: true, isRunning: false, timeLeft: 0}; // Reset to initial state + add true flag to inform that the game is completed
    case PAUSE_GAME:
      return {...state, isRunning: false, timeLeft: action.payload};
    case CONTINUE_GAME:
      return {...state, isRunning: true};
    default:
      return state;
  }
}

export default boardReducer;
