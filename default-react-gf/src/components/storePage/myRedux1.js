const createStore = (reducer) => {
  let state = undefined;
  const cbs = [];

  const dispatch = function (action) {
    state = reducer(state, action);
    cbs.forEach((element) => {
      element();
    });
  };

  const getState = () => state;

  const subscribe = (cb) => {
    cbs.push(cb);
  };

  dispatch({ type: "@@@@@@12321314" });

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export { createStore };
