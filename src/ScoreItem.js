import React, { Component } from "react";
import "./App.css";

class ScoreItem extends Component {
  render() {
    return (
      <div className="ScoreItem">
        <span className="rank">{this.props.rank}</span>
        <span className="name">{this.props.name}</span>
        <span className="score">{this.props.score}</span>
      </div>
    );
  }
}

export default ScoreItem;
