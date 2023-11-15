import { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { login } from "../thunks/userThunk";
import { RootState } from "../store";
import { AppDispatch } from "../store";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  
  const userLogin = useSelector((state: RootState) => state.loginReducer);
  const error = useSelector((state: RootState) => state.loginReducer.error);
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

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <FormContainer>
      <h1>Login</h1>

      {error && (
        <div style={{ color: "red" }}> {interpretErrorMessage(error)} </div>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username" className="my-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="string"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="my-3">
          Login
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
