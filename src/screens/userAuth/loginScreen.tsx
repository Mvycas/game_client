import {
  SyntheticEvent,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../thunks/userThunk";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import "./formStyle.css";
// import { getIncompleteGamesByUserId } from "../thunks/gameThunk";

const LoginScreen = () => {
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state: RootState) => state.loginReducer.error);

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginReducer.isLoggedIn
  );

  const interpretErrorMessage = (error: any) => {
    console.log(error);
    if (!usernameRef.current?.value) {
      return "Username cannot be empty.";
    }
    return "There was an issue with your login. Please check your credentials and try again.";
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    // Just dispatch the login action, don't chain then() here
    dispatch(login(username, password)).catch((error: any) => {
      // Handle any errors that occurred during the login process
      console.error("Login failed:", error);
    });
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Login</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {" "}
          {interpretErrorMessage(error)}{" "}
        </div>
      )}
      <Form onSubmit={submitHandler} className="profile-form">
        <Form.Group controlId="username" className="profile-form">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="string"
            placeholder="Username"
            ref={usernameRef}
            className="profile-input"
          />
        </Form.Group>

        <Form.Group controlId="password" className="profile-form">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="profile-input"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="profile-button">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginScreen;
