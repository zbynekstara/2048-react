import React, { Component } from "react";
import "./App.css";
import GameRow from "./GameRow.js";

class GameMatrix extends Component {
  render() {
    const { state } = this.props.gameData;
    const rows = state && state.map((row, index) =>
      <GameRow key={index} values={row} />
    );

    return (
      <div className="GameMatrix">
        {rows}
      </div>
    );
  }
}

export default GameMatrix;
