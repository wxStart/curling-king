import React from "react";

const FancyButton1 = ({ childRef, ...props }) => {
  return <div ref={childRef}>FancyButton1</div>;
};

export default FancyButton1;
