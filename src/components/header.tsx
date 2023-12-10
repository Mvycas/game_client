import { SyntheticEvent } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../thunks/userThunk";
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginReducer.isLoggedIn
  );

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
          {isLoggedIn ? (
            <Nav className="ms-auto">
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
