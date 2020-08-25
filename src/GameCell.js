import React, { Component } from "react";
import "./App.css";

class GameCell extends Component {
  render() {
    return (
      <div className="GameCell">
        {this.props.value}
      </div>
    );
  }
}

export default GameCell;
