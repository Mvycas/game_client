import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { AppDispatch } from "../store";
import { saveBoard, startNewGame } from "../actions/gameActions";
import { getBoard, moveTile } from "./createBoard";
import { Position, canMove } from "../game/board";
import "./gameScreen.css";

const GameScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentBoardArrangement = useSelector(
    (state: RootState) => state.boardReducer.board
  );

  // State to track the first selected tile position
  const [firstSelectedTile, setFirstSelectedTile] = useState<Position | null>(
    null
  );

  const handleTileClick = (position: Position) => {
    if (firstSelectedTile) {
      // Dispatch the action to save the updated board state
      if (canMove(currentBoardArrangement, firstSelectedTile, position)) {
        dispatch(
          saveBoard(
            moveTile(firstSelectedTile, position, currentBoardArrangement).board
          )
        );
        console.log(
          moveTile(firstSelectedTile, position, currentBoardArrangement).board
        );
      } else console.log("cannot move");
      // Reset firstSelectedTile after attempting the move
      setFirstSelectedTile(null);
    } else {
      // If no tile is selected, set this as the firstSelectedTile
      setFirstSelectedTile(position);
    }
  };

  // const moveTile1 = (first: Position, second: Position) => {
  //   if (canMove(currentBoardArrangement, first, second)) {
  //     dispatch(saveBoard(moveTile(first, second).board));
  //   } else console.log("cannot move");
  // };

  const createNewGame = () => {
    const board = getBoard();
    dispatch(startNewGame(board));
    // Reset the selected tile when starting a new game
    setFirstSelectedTile(null);
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const tileStyle = {
    paddingTop: "0.13em",
    width: "70px",
    height: "70px",
  };

  const isTileSelected = (rowIndex: any, colIndex: any) => {
    return (
      firstSelectedTile &&
      firstSelectedTile.row === rowIndex &&
      firstSelectedTile.col === colIndex
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
      }}
    >
      {/* MENU */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Button
          className="button-64"
          onClick={createNewGame}
          style={{
            marginBottom: "2rem",
            width: "16rem",
            height: "3rem",
          }}
        >
          Create New Game
        </Button>
      </div>
      {/* MENU */}

      <div>
        {currentBoardArrangement.tiles.map((row, rowIndex) => (
          <div key={rowIndex} style={rowStyle}>
            {row.map((candyColor, colIndex) => (
              <img
                key={`${rowIndex}-${colIndex}`}
                src={candyColor}
                alt={candyColor}
                style={{
                  ...tileStyle,
                  backgroundColor: candyColor,
                  border: isTileSelected(rowIndex, colIndex)
                    ? "3px solid blue"
                    : "3px solid transparent", // if tile is not selected, display transparent. Just some styling. Hard to explain, you can change it to "none" and you will see
                  borderRadius: "17px",
                }}
                onClick={() =>
                  handleTileClick({ row: rowIndex, col: colIndex })
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
