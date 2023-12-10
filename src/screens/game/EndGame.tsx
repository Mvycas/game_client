import React from "react";

interface EndGameProps {
  score: number;
  time: number;
}

const EndGame: React.FC<EndGameProps> = ({ score, time }) => {
  return (
    <div
      className="end-game-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center", // This centers the text horizontally
        color: "white",
        alignSelf: "center", // This won't have an effect since it's not a flex item of a flex container
        marginBottom: "2rem",
      }}
    >
      <h2>Game Ended!</h2>
      <p>Your score: {score}</p>
      <p>You had {time} seconds allocated</p>
    </div>
  );
};

export default EndGame;
