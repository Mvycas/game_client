import white from "../images/block_air_jelly.png";
import black from "../images/block_demon_jelly.png";
import red from "../images/block_fire_jelly.png";
import yellow from "../images/block_flash_jelly.png";
import green from "../images/block_forest_jelly.png";
import blue from "../images/block_ice_jelly.png";

export const SAVE_BOARD = "SAVE_BOARD";
export const GAME_STARTED = "GAME_STARTED";
export const GAME_START_REQ = "GAME_START_REQ";
export const REQ_FAILED = "REQ_FAILED";
export const GAME_END = "GAME_END";
export const RESUME_GAME = "RESUME_GAME";
export const PAUSE_GAME = "PAUSE_GAME";
export const UPDATE_TIME = "UPDATE_TIME";

export const REQ_UNFINISHED_GAME = "REQ_UNFINISHED_GAME";
export const GET_UNFINISHED_GAME_SUCCESS = "GET_UNFINISHED_GAME_SUCCESS";
export const GET_UNFINISHED_GAME_FAILED = "GET_UNFINISHED_GAME_FAILED";

export const candyColors = {
  white,
  black,
  red,
  yellow,
  green,
  blue,
};

export const boardWidth = 8;
export const boardDepth = 8;
