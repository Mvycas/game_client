import { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../thunks/userThunk";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import "./formStyle.css";
import { getIncompleteGamesByUserId } from "../thunks/gameThunk";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state: RootState) => state.loginReducer);
  const error = useSelector((state: RootState) => state.loginReducer.error);
  const token = useSelector((state: RootState) => state.loginReducer.token);
  const userId = useSelector((state: RootState) => state.loginReducer.userId);
  const isLoggedIn = userLogin?.isLoggedIn;
  const userInfo: any = userLogin?.userData;

  const interpretErrorMessage = (error: any) => {
    console.log(error);
    if (username.trim() === "") {
      return "Username cannot be empty.";
    }
    return "There was an issue with your login. Please check your credentials and try again.";
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [userInfo, navigate, isLoggedIn]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    // Just dispatch the login action, don't chain then() here
    dispatch(login(username, password)).catch((error) => {
      // Handle any errors that occurred during the login process
      console.error("Login failed:", error);
    });
  };

  // Use useEffect to react to changes in the login state
  useEffect(() => {
    if (isLoggedIn && userId != null && token) {
      // Now that we have a confirmed login, dispatch the getIncompleteGames action
      dispatch(getIncompleteGamesByUserId(userId, token));
    }
  }, [dispatch, isLoggedIn, userId, token]);

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
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="profile-input"
          />
        </Form.Group>

        <Form.Group controlId="password" className="profile-form">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
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
