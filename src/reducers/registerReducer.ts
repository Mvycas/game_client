import {
    USER_REGISTER_REQ,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
  } from '../constants/userConstants';
  
  const initialState = {
    isRegistered: false,
    userData: null,
    error: null,
  };
  
  // Here we are taking two props, state and action. Reducer will take the current state and return a new one according to the triggered action
  const registerReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case USER_REGISTER_REQ:
        return { ...state, isRegistered: false, error: null };
      case USER_REGISTER_SUCCESS:
        //                                   USER DATA MEANINGLESS at this point - FIND WAY HOW TO PARSE IT IN COMPONENT OR HOW TO REMOVE IT
        return { ...state, isRegistered: true, userData: action.payload, error: null };
      case USER_REGISTER_FAIL:
        return { ...state, isRegistered: false, error: action.payload };
      default:
        return state;
    }
  }
      
  export default registerReducer;