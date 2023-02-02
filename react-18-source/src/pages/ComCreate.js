import * as React from "react";

class CCom extends React.Component {
  state = {
    count: 0,
  };

  onChangeCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    const { count } = this.state;
    return <div onClick={this.onChangeCount}>{count}</div>;
  }
}

export default function ComCreate() {
  return (
    <div>
      <p>文本</p>
      <CCom></CCom>
      <div>11111</div>
      222
      <div>3333</div>
      
    </div>
  );
}
