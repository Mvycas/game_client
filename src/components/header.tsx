import { SyntheticEvent, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../thunks/userThunk";
import { LinkContainer } from "react-router-bootstrap";
import { pauseGame, resumeGame } from "../Actions/GameTime";
import { useLocation } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginReducer.isLoggedIn
  );
  const isGameRunning = useSelector(
    (state: RootState) => state.boardReducer.isRunning
  );
  const remainingTime = useSelector(
    (state: RootState) => state.boardReducer.remainingTime
  );

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <LinkContainer
              to="/signup"
              style={{ color: "white", marginRight: "2rem" }}
            >
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to="/"
              style={{ color: "white", marginRight: "2rem" }}
            >
              <Nav.Link>game</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to="/login"
              style={{ color: "white", marginRight: "2rem" }}
            >
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
