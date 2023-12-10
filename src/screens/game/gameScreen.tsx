import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { saveBoard, startNewGame, endGame } from "../../thunks/gameThunk";
import { getBoard, moveTile } from "./createBoard";
import { Position, canMove } from "../../game/board";
import "./gameScreen.css";
import { useNavigate } from "react-router";
import canva from "../../images/Untitled.png";
import randomIntFromInterval from "../../helperFunctions/randomIntFromInterval";
import EndGame from "./EndGame";

const GameScreen = () => {
  const [timer, setTimer] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const timeRef = useRef<number>(0);

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginReducer.isLoggedIn
  );
  const LoggedUserToken = useSelector(
    (state: RootState) => state.loginReducer.token
  );

  const currentBoardArrangement = useSelector(
    (state: RootState) => state.boardReducer.board
  );

  const isGameRunning = useSelector(
    (state: RootState) => state.boardReducer.isRunning
  );
  const isEnd = useSelector((state: RootState) => state.boardReducer.isEnd);

  const score = useSelector(
    (state: RootState) => state.boardReducer.board.score
  );
  const gameId = useSelector((state: RootState) => state.boardReducer.gameId);

  // State to track the first selected tile position
  const [firstSelectedTile, setFirstSelectedTile] = useState<Position | null>(
    null
  );

  useEffect(() => {
    if (isGameRunning) {
      setTimer(timeRef.current);
      const timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerId);
            dispatch(endGame(gameId, LoggedUserToken)); //end
            return 0;
          }
        });
      }, 1000);

      // Clear the interval on component unmount or if the game stops running
      return () => clearInterval(timerId);
      // DISPATCH ENDGAME TO STORE. SEND SCORE TO SERVER AND RESET STATES
    }
  }, [LoggedUserToken, dispatch, gameId, isGameRunning, navigate]);

  const handleTileClick = (position: Position) => {
    if (firstSelectedTile) {
      // Dispatch the action to save the updated board state
      if (canMove(currentBoardArrangement, firstSelectedTile, position)) {
        console.log(score);
        dispatch(
          saveBoard(
            moveTile(firstSelectedTile, position, currentBoardArrangement)
              .board,
            gameId,
            LoggedUserToken,
            score,
            timer
          )
        );
      } else console.log("cannot move");
      // Reset firstSelectedTile after attempting the move
      setFirstSelectedTile(null);
    } else {
      // If no tile is selected, set this as the firstSelectedTile
      setFirstSelectedTile(position);
    }
  };

  const createNewGame = () => {
    const board = getBoard();
    timeRef.current = randomIntFromInterval(3, 5);
    dispatch(startNewGame(board, LoggedUserToken, timeRef.current));
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
      {/* Conditionally render EndGame */}
      {isEnd && !isGameRunning && (
        <EndGame score={score} time={timeRef.current}></EndGame>
      )}

      {/* MENU */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {!isGameRunning && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div>
              {isLoggedIn ? (
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
              ) : (
                <p>You need to log in to start a new game.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isGameRunning ? (
          <img
            src={canva}
            alt={canva}
            style={{
              marginTop: "25px",
              borderRadius: "125px",
            }}
          ></img>
        ) : null}
      </div>

      <div>
        {isGameRunning ? <h1 data-heading={`${score}`}>{score}</h1> : null}
      </div>
      {/* MENU */}

      {isGameRunning ? (
        <div>
          {currentBoardArrangement.tiles.map((row: any, rowIndex: any) => (
            <div key={rowIndex} style={rowStyle}>
              {row.map((candyColor: any, colIndex: any) => (
                <img
                  key={`${rowIndex}-${colIndex}`}
                  src={candyColor}
                  alt={candyColor}
                  style={{
                    ...tileStyle,
                    backgroundColor: candyColor,
                    border: isTileSelected(rowIndex, colIndex)
                      ? "4px solid gold"
                      : "4px solid transparent", // if tile is not selected, display transparent. Just some styling. Hard to explain, you can change it to "none" and you will see
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
      ) : null}
    </div>
  );
};

export default GameScreen;
