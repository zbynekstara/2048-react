import React, { Component } from "react";
import "./App.css";
import GameMatrix from "./GameMatrix.js";

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <h1>2048</h1>
        <div className="score"><div className="label">Score</div><div>{this.props.gameData.score}</div></div>
        <div className="best"><div className="label">Best</div><div>{window.sessionStorage.getItem("bestScore") || 0}</div></div>
        <div className="text">Join the numbers and get to the <b>2048 tile!</b></div>
        <button onClick={this.props.onNewGame}>New Game</button>
        <GameMatrix gameData={this.props.gameData} />
      </div>
    );
  }
}

export default Game;
