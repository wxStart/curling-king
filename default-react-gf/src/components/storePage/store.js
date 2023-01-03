// import { createStore, applyMiddleware } from "redux";
import { createStore,applyMiddleware } from "./myRedux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const initialState = {
  count: 1,
};

const reduxReducer = (state = initialState, { type }) => {
  switch (type) {
    case "add":
      return { ...state, count: state.count + 1 };
    case "minus":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(reduxReducer, applyMiddleware(thunk, logger));

export default store;
