import React from "react";

/**
 * forwardRef 函数有两个参数 第一个是props  第二个参数是ref
 */

const FancyButton = React.forwardRef((props, ref) => {
  return <div ref={ref}>FancyButton {props.name}</div>;
});

export default FancyButton;
