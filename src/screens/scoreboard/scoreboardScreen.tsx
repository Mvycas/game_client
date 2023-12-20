import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { getScoreboard } from "../../thunks/gameThunk";
import "./scoreboardScreen.css";

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
    dispatch(getScoreboard(currentUserUsername, currentUserTokken));
  }, [currentUserTokken, currentUserUsername, dispatch]);

  return (
    <div className="scoreboard">
      {userScores.length > 0 && (
        <div className="section">
          <h3 className="heading">My Top Scores</h3>
          <div className="userScore">
            {userScores.map((game: any, index: any) => (
              <div key={index} className="userScoreItem">
                {game.score}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="section" />

      <div className="section">
        <h3 className="heading">Top Scores</h3>
        <ol className="scoreList">
          {topScores.map((game: any, index: any) => (
            <li key={index} className="scoreItem">
              {game.username} - {game.score}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ScoreboardScreen;
