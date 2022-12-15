import React from "react";

const hoc = (Com) => (props) => {
  return (
    <div>
      hoc---
      <Com {...props}></Com>
    </div>
  );
};

const Child = (props) => {
  return <div>child: {props.name}</div>;
};


const Com = hoc(Child);

// export default class HocPage extends React.Component {
//   render() {
//     return hoc(Child)({ name: "wxx" });
//   }
// }

export default class HocPage extends React.Component {
  render() {
    return (
      <>
        <Com name="wxx"></Com>
        {Com({ name: "wxxxxxx" })}
      </>
    );
  }
}
