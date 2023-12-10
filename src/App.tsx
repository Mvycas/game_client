import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import LoginScreen from "./screens/loginScreen";
import GameScreen from "./screens/game/gameScreen";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

import "./App.css";
import RegisterScreen from "./screens/registerScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="/login" element={<LoginScreen />} />
            {/* <Route path="/" element={
              <ProtectedRoute>
                <GameScreen />
              </ProtectedRoute>
            } /> */}
            <Route path="/" element={<GameScreen />} />
            <Route path="/signup" element={<RegisterScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
