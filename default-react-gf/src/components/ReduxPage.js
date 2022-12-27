import React from "react";
import store from "./storePage/store";
console.log("store: ", store);

export default class ReduxPage extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  addAsync = () => {
    console.log(111)
    store.dispatch(() => {
      setTimeout(() => {
        store.dispatch({ type: "add" });
      }, 1000);
    });
  };

  render() {
    const state = store.getState();
    return (
      <>
        <div>ReduxPage</div>
        <button
          onClick={() => {
            store.dispatch({ type: "minus" });
          }}
        >
          -
        </button>
        {state.count}
        <button
          onClick={() => {
            store.dispatch({ type: "add" });
          }}
        >
          +
        </button>
        <button onClick={this.addAsync}>+addAsync</button>
      </>
    );
  }
}
