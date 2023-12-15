import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/loginScreen";
import GameScreen from "./screens/game/gameScreen";

import "./App.css";
import RegisterScreen from "./screens/registerScreen";
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
              path="/account/edit"
              element={
                <ProtectedRoute>
                  <RegisterScreen />
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
