import compose from "./compose";

const createStore = (reducer, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer); // 在这里先把createStore 加强处理一下，返回新的加强后的createStore ，这里没有第二个参数就不会导致无限递归
  }
  let state = undefined;
  const cbs = [];

  const dispatch = function (action) {
    console.log('action: ', action);
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

const applyMiddleware = (...middlewares) => {
  return (createStore) =>
    (...arg) => {
      const store = createStore(...arg); ///arg 实际上就reducer
      let dispatch = store.dispatch;
      const midApi = {
        getState: store.getState,
        dispatch: dispatch,
      };
      const chains = middlewares.map((mw) => mw(midApi)); //把 state和dispatch 传入给中间件，每个中间件都执行了
      dispatch = compose(...chains)(dispatch);
      return { ...store, dispatch };
    };
};

export { createStore, applyMiddleware };
