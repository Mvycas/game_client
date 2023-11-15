import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const HomeScreen = () => {
  const userId = useSelector((state: RootState) => state.loginReducer.userId);

  return userId ? (
    <h1>Welcome, User {userId}</h1> // doesnt show user with id 0
  ) : (
    <h1>Welcome to the Home Page!</h1>
  );
};

export default HomeScreen;
