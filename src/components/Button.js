import React from "react";

class Button extends React.Component {
  render() {
    const value = this.props.children;
    return (
      <button
        className={this.props.className}
        // disabled={this.state.disabled}
        value={value}
        onClick={() => {
          this.props.handleClick(value);
        }}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
