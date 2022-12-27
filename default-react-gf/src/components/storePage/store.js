import { createStore } from "redux";
// import { createStore } from "./myRedux";

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

const store = createStore(reduxReducer);

export default store;
