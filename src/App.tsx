import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/userAuth/loginScreen";
import GameScreen from "./screens/game/gameScreen";
import ScoreboardScreen from "./screens/scoreboard/scoreboardScreen";
import Profile from "./screens/profile/profile";

import "./App.css";
import RegisterScreen from "./screens/userAuth/registerScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import ResponsiveAppBar from "./components/navbar";

const App = () => {
  return (
    <div className="main-container">
      <div className="content">
        <Router>
          <ResponsiveAppBar />
          <Routes>
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<GameScreen />} />
            <Route path="/signup" element={<RegisterScreen />} />

            <Route
              path="/scoreboard"
              element={
                <ProtectedRoute>
                  <ScoreboardScreen />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
