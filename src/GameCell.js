import React, { Component } from "react";
import "./App.css";

class GameCell extends Component {
  render() {
    const value = this.props.value;
    const className = "GameCell v" + value;

    return (
      <div className={className}>
        {value}
      </div>
    );
  }
}

export default GameCell;
