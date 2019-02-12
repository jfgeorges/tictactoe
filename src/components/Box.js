import React from "react";

class Box extends React.Component {
  callBackClick = idBox => {
    return this.props.callBackClick(this.props.idBox);
  };
  render() {
    return (
      <div className="box" id={this.props.idBox} onClick={this.callBackClick}>
        <div className="tictactoe">{this.props.boxValue}</div>
      </div>
    );
  }
}

export default Box;
