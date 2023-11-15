import {
    USER_LOGIN_REQ,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  } from '../constants/userConstants';
  
  const initialState = {
    isLoggedIn: false,
    userData: null,
    token: null,
    userId: null,
    error: null,
  };
  
  // Here we are taking two props, state and action. Reducer will take the current state and return a new one according to the triggered action
  const userLoginReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case USER_LOGIN_REQ:
        return { ...state, isLoggedIn: false, error: null };
      case USER_LOGIN_SUCCESS:
        //                                   USER DATA MEANINGLESS - FIND WAY HOW TO PARSE IT IN COMPONENT OR HOW TO REMOVE IT
        return { ...state, isLoggedIn: true, userData: action.payload, token: action.payload.token, userId: action.payload.userId, error: null };
      case USER_LOGIN_FAIL:
        return { ...state, isLoggedIn: false, error: action.payload };
      case USER_LOGOUT:
        return { ...initialState };
      default:
        return state;
    }
  }
      
  export default userLoginReducer;