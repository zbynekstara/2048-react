import React, { Component } from "react";
import "./App.css";
import GameCell from "./GameCell.js";

class GameRow extends Component {
  render() {
    const values = this.props.values;
    const cells = values && values.map((cell, index) =>
      <GameCell key={index} value={cell} />
    );

    return (
      <div className="GameRow">
        {cells}
      </div>
    );
  }
}

export default GameRow;
