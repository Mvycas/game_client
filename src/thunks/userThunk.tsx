import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQ,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQ,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQ,
} from "../constants/userConstants";
import { RootState } from "../store";

export const login =
  (username: String, password: String) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQ,
      });

      const response = await fetch("http://localhost:9090/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      const userData = { token: data.token, userId: data.userId };

      if (response.ok) {
        // localStorage.setItem("tokken", userData.token);
        // localStorage.setItem("userId", userData.userId);
        // localStorage.setItem("logged", JSON.stringify(true));

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: userData,
        });
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error: any) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const register =
  (username: String, password: String) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQ,
      });

      const response = await fetch("http://localhost:9090/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      const userData = { token: data.token, userId: data.userId };

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: userData,
      });
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const setError = (error: String) => async (dispatch: Dispatch) => {
  dispatch({
    type: USER_REGISTER_FAIL,
    payload: error,
  });
};

export const logoutReq = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: USER_LOGOUT_REQ });
  };
};

export const logout =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    try {
      const token: any = getState().loginReducer?.token;
      const logoutResponse = await fetch(
        `http://localhost:9090/logout?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (logoutResponse.ok) {
        // localStorage.clear(); // Uncomment if you want to clear local storage
        dispatch({ type: USER_LOGOUT });
      } else {
        // Handle non-successful logout response
        throw new Error(`Logout failed! Status: ${logoutResponse.status}`);
      }
    } catch (error: any) {
      dispatch({
        type: USER_LOGOUT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
