import {
    USER_LOGIN_REQ,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LOGOUT_REQ,
  } from '../constants/userConstants';
  
  const initialState = {
    isLoggedIn: false,
    logoutReq: false,
    username: "",
    token: null,
    userId: null,
    error: null,
  };
  
  // Here we are taking two props, state and action. Reducer will take the current state and return a new one according to the triggered action
  const userLoginReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case USER_LOGOUT_REQ: 
        return { ...state, logoutReq: true };
      case USER_LOGIN_REQ:
        return { ...state, isLoggedIn: false, error: null };
      case USER_LOGIN_SUCCESS:
        return { ...state, isLoggedIn: true, token: action.payload.userData.token, userId: action.payload.userData.userId, username: action.payload.username, error: null };
      case USER_LOGIN_FAIL:
        return { ...state, isLoggedIn: false, error: action.payload };
      case USER_LOGOUT:
        return { ...initialState };

      default:
        return state;
    }
  }
      
  export default userLoginReducer;