import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { saveBoard, startNewGame } from "../../actions/gameActions";
import { getBoard, moveTile } from "./createBoard";
import { Position, canMove } from "../../game/board";
import "./gameScreen.css";
import { useNavigate } from "react-router";
import canva from "../../images/Untitled.png";
import randomIntFromInterval from "../../helperFunctions/randomIntFromInterval";

const GameScreen = () => {
  const [timer, setTimer] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const LoginState = useSelector((state: RootState) => state.loginReducer);
  const error = useSelector((state: RootState) => state.loginReducer.error);
  const isLoggedIn = LoginState?.isLoggedIn;
  const userInfo: any = LoginState?.userData;
  
  const currentBoardArrangement = useSelector(
    (state: RootState) => state.boardReducer.board
  );

  const isGameRunning = useSelector(
    (state: RootState) => state.boardReducer.gameState
  );

  const score = useSelector(
    (state: RootState) => state.boardReducer.board.score
  );

  // State to track the first selected tile position
  const [firstSelectedTile, setFirstSelectedTile] = useState<Position | null>(
    null
  );

  useEffect(() => {
    if (isGameRunning) {
      setTimer(randomIntFromInterval(60, 290));
      const timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerId);
            navigate("/login"); //dispatch(endGame(score, userId))
            return 0;
          }
        });
      }, 1000);

      // Clear the interval on component unmount or if the game stops running
      return () => clearInterval(timerId);
      // DISPATCH ENDGAME TO STORE. SEND SCORE TO SERVER AND RESET STATES
    }
  }, [isGameRunning, navigate]);
  const handleTileClick = (position: Position) => {
    if (firstSelectedTile) {
      // Dispatch the action to save the updated board state
      if (canMove(currentBoardArrangement, firstSelectedTile, position)) {
        console.log(score);
        dispatch(
          saveBoard(
            moveTile(firstSelectedTile, position, currentBoardArrangement).board
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
        <div>
          {!isGameRunning ? (
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
          ) : null}
        </div>
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
    </div>
  );
};

export default GameScreen;
