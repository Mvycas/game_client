import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { AppDispatch } from "../store";
import { saveBoard, startNewGame } from "../actions/gameActions";
import { getBoard, moveTile } from "./createBoard";
import { Position, canMove } from "../game/board";

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
    const board = getBoard(); // Assuming this is synchronous
    dispatch(startNewGame(board));
    // Reset the selected tile when starting a new game
    setFirstSelectedTile(null);
  };

  const rowStyle = {
    display: "flex",
  };

  const tileStyle = {
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
    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
      <Button onClick={createNewGame}>Create New Game</Button>
      <div>
        {currentBoardArrangement.tiles.map((row, rowIndex) => (
          <div key={rowIndex} style={rowStyle}>
            {row.map((candyColor, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  ...tileStyle,
                  backgroundColor: candyColor,
                  border: isTileSelected(rowIndex, colIndex)
                    ? "3px solid blue"
                    : "none", // Highlight selected tile
                }}
                onClick={() =>
                  handleTileClick({ row: rowIndex, col: colIndex })
                }
              >
                {candyColor}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
