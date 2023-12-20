import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { getScoreboard } from "../thunks/gameThunk";

const ScoreboardScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const topScores = useSelector(
    (state: RootState) => state.gameReducer.topScores
  );
  const userScores = useSelector(
    (state: RootState) => state.gameReducer.userScores
  );
  const currentUserUsername = useSelector(
    (state: RootState) => state.loginReducer.username
  );
  const currentUserTokken = useSelector(
    (state: RootState) => state.loginReducer.token
  );

  useEffect(() => {
    // Assume this action fetches and sets the scores in the state
    dispatch(getScoreboard(currentUserUsername, currentUserTokken));
  }, [currentUserTokken, currentUserUsername, dispatch]);

  // Define your handle functions and any other component logic here

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
      {/* Your game logic here... */}

      {/* Logged-in User's Top Scores */}
      {userScores.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "white" }}>My Top Scores</h3>
          <div
            style={{
              color: "white",

              gap: "10px",
            }}
          >
            {userScores.map((game: any, index: any) => (
              <div
                key={index}
                style={{ padding: "10px", border: "1px solid white" }}
              >
                {game.score}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Space between the user scores and top scores */}
      <div style={{ height: "2rem", color: "white" }} />

      {/* Overall Top Scores */}
      <div style={{ marginBottom: "2rem", color: "white" }}>
        <h3>Top Scores</h3>
        <ol>
          {topScores.map((game: any, index: any) => (
            <li key={index}>
              {game.username}: {game.score}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ScoreboardScreen;
