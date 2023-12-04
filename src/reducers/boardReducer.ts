import { SAVE_BOARD, GAME_STARTED } from '../constants/gameConstants';

interface GameBoard {
    w: number;       // Width of the board
    h: number;       // Height of the board
    tiles: string[][];
    score: number;  
}

interface GameState {
    gameState: boolean;  
    board: GameBoard;   
}

const initialState: GameState = {
    gameState: false,
    board: {
      w: 0, // Initial width
      h: 0, // Initial height
      tiles: [], // Initial tiles
      score: 0
    },
  };

interface GameAction {
    type: typeof SAVE_BOARD | typeof GAME_STARTED;
    payload: GameBoard;  
}

const boardReducer = (state: GameState = initialState, action: GameAction) => {
  switch (action.type) {
    case GAME_STARTED:
      return { ...state, gameState: true, board: action.payload };
    case SAVE_BOARD:
      return { ...state, gameState: true, board: action.payload };
    default:
      return state;
  }
}

export default boardReducer;
