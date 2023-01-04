import React, { Component } from "react";

import FancyButton from "./components/FancyButton";

import FancyButton1 from "./components/FancyButton1";
// 在这个组件里面想拿到 FancyButton 中 ref

function logProps(Component) {
  class LogProps extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}

const LogPropsCom = logProps(FancyButton);

export default class index extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.childRef = React.createRef();
    this.childHocRef = React.createRef();
  }
  componentDidMount() {
    console.log("this: ", this);
    console.log("this.ref: ", this.ref);
    console.log("this.refDom 回调函数形式的ref ", this.refDom);
    console.log("this.refs.abcd: 字符串形式的ref ", this.refs.abcd);
    console.log("this.childRef 传递给组件的ref: ", this.childRef);
    console.log(" this.childCbRef:传递函数形式给组件的ref ", this.childCbRef);
    console.log(" this.childHocRef:高阶组件中的ref传递 ", this.childHocRef);
  }
  render() {
   
    return (
      <div>
        <div ref={"abcd"}>1111</div>
        <div ref={this.ref}>2222</div>
        <div ref={(el) => (this.refDom = el)}>3333</div>
        <FancyButton ref={this.childRef} name={"wxxx"}></FancyButton>
        <FancyButton1 childRef={(el) => (this.childCbRef = el)}></FancyButton1>
        <LogPropsCom ref={this.childHocRef} name="HOC"></LogPropsCom>
      </div>
    );
  }
}
