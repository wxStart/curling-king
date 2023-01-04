import React, { Component } from "react";
import { UserInfoContext } from "./context";

export default class ChildComC extends Component {
  render() {
    let value = this.context;
    console.log('this: ', this);
    console.log("value11111111111111111111: ", value);
    return <div>ChildComC name： {value.name}</div>;
  }
}

ChildComC.displayName = "UserInfoContext";
ChildComC.contextType = UserInfoContext; // 还是需要把这个组件包裹在 Provider中
