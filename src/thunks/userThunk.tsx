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

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });

      // localStorage.setItem("userInfo", JSON.stringify(userData));
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

export const logout =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    const token: any = getState().loginReducer?.token;
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });

    await fetch(
      `http://localhost:9090/logout?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
  };
