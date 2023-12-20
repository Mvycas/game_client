import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { saveBoard, startNewGame, endGame } from "../../thunks/gameThunk";
import { getBoard, moveTile } from "./createBoard";
import { Position, canMove } from "../../game/board";
import "./gameScreen.css";
import canva from "../../images/Untitled.png";
import randomIntFromInterval from "../../helperFunctions/randomIntFromInterval";
import EndGame from "./EndGame";
import { pauseGame, resumeGame } from "../../Actions/GameTime";
import { useLocation } from "react-router-dom";

const GameScreen = () => {
  const dispatch: AppDispatch = useDispatch();

  const remainingTimeRedux = useSelector(
    (state: RootState) => state.gameReducer.remainingTime
  );
  const [getRemainingTime, setRemainingTime] = useState(remainingTimeRedux);

  const getRemainingTimeRef = useRef(getRemainingTime);

  useEffect(() => {
    // Update local state when remainingTimeRedux changes
    // after logging in and fetching previous game data to the store
    setRemainingTime(remainingTimeRedux);
  }, [remainingTimeRedux]);

  useEffect(() => {
    getRemainingTimeRef.current = getRemainingTime;
  }, [getRemainingTime]);

  const allocatedTime = useSelector(
    (state: RootState) => state.gameReducer.allocatedTime
  );

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginReducer.isLoggedIn
  );
  const LoggedUserToken = useSelector(
    (state: RootState) => state.loginReducer.token
  );

  const isGamePaused = useSelector(
    (state: RootState) => state.gameReducer.isPaused
  );

  const currentBoardArrangement = useSelector(
    (state: RootState) => state.gameReducer.board
  );

  const isGameRunning = useSelector(
    (state: RootState) => state.gameReducer.isRunning
  );
  const isEnd = useSelector((state: RootState) => state.gameReducer.isEnd);

  const score = useSelector(
    (state: RootState) => state.gameReducer.board.score
  );
  const gameId = useSelector((state: RootState) => state.gameReducer.gameId);

  // State to track the first selected tile position
  const [firstSelectedTile, setFirstSelectedTile] = useState<Position | null>(
    null
  );

  const shouldRenderEndGame = isEnd && !isGameRunning;

  const location = useLocation();

  useEffect(() => {
    let timer: any;
    if (isGameRunning) {
      timer = setInterval(() => {
        setRemainingTime((prevTime: number) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            dispatch(endGame(gameId, LoggedUserToken));
            return 0; // Ensure the remaining time doesn't go negative
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isGameRunning]);

  useEffect(() => {
    return () => {
      if (isGameRunning) {
        dispatch(pauseGame(getRemainingTimeRef.current));
      }
    };
  }, [location.pathname, isGameRunning, dispatch]);

  const isValidMove = (
    currentBoardArrangement: any,
    firstSelectedTile: any,
    position: any
  ) => {
    // Logic for checking a valid move
    return canMove(currentBoardArrangement, firstSelectedTile, position);
  };

  const saveUpdatedBoard = (
    board: any,
    gameId: any,
    token: any,
    remainingTime: any
  ) => {
    // Logic for dispatching saveBoard action
    dispatch(saveBoard(board, gameId, token, remainingTime));
  };

  const handleTileClick = (position: Position) => {
    if (firstSelectedTile) {
      if (isValidMove(currentBoardArrangement, firstSelectedTile, position)) {
        saveUpdatedBoard(
          moveTile(firstSelectedTile, position, currentBoardArrangement).board,
          gameId,
          LoggedUserToken,
          getRemainingTimeRef.current
        );
      } else {
        console.log("cannot move");
      }
      setFirstSelectedTile(null);
    } else {
      setFirstSelectedTile(position);
    }
  };

  console.log("is paused: ", isGamePaused);
  console.log("is END?: ", isEnd);

  const createNewGame = () => {
    const board = getBoard();
    // Generate a new random time interval
    const newTimeAllocated = randomIntFromInterval(60, 290);
    dispatch(startNewGame(board, LoggedUserToken, newTimeAllocated));
    setRemainingTime(newTimeAllocated);
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
      {isGamePaused && isLoggedIn && !isEnd && (
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
            onClick={() => dispatch(resumeGame())}
            style={{
              marginBottom: "2rem",
              width: "16rem",
              height: "3rem",
            }}
          >
            resume
          </Button>
        </div>
      )}

      {/* Conditionally render EndGame */}
      {shouldRenderEndGame && (
        <EndGame score={score} time={allocatedTime}></EndGame>
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
