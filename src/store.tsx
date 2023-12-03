import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userLoginReducer from "./reducers/userReducer";
import registerReducer from "./reducers/registerReducer";
import boardReducer from "./reducers/boardReducer";

const reducers = combineReducers({
  loginReducer: userLoginReducer,
  registerReducer,
  boardReducer,
});

// const initialState = {};

const store = configureStore({
  reducer: reducers,
  // preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
