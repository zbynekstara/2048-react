import React, { Component } from "react";
import "./App.css";

class Button extends Component {
  render() {
    const className = (this.props.invertedColor ? "Button invertedColor" : "Button");

    return (
      <button className={className} onClick={this.props.onClick}>
        {this.props.action}
      </button>
    );
  }
}

export default Button;
