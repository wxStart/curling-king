import React from "react";

export default class ClickNumber extends React.Component {
  state = {
    number: 0,
  };

  componentDidMount() {
    // setTimeout(() => {
    //   console.log("setTimeout: ", 1111);
    //   this.onClickAdd();
    // }, 1000);

    // document.getElementById("test").addEventListener("click", () => {
    //   console.log("click: ", 1111);
    //   this.onClickAdd();
    // });
  }
  onClickAdd = () => {
    this.setState({
      number: this.state.number + 1,
    });

    console.log("this.state.number: ", this.state.number);
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.number === 3) {
      return false; // 返回false不更新
    }
    return true;
  }

  onClickAdd1 = () => {
    this.setState((currnetState) => {
      return {
        number: currnetState.number + 1,
      };
    });
    this.setState((currnetState) => {
      return {
        number: currnetState.number + 2,
      };
    });
  };

  render() {
    const { number } = this.state;
    return (
      <>
        <div onClick={this.onClickAdd}>{number}</div>
        111111111111111112222222222222222222222222222222222222
        <div id="test">同步：{number}</div>
        111111111111111112222222222222222222222222222222222222
        <div onClick={this.onClickAdd1}>{number}</div>
      </>
    );
  }
}
