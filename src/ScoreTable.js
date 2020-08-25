import React, { Component } from "react";
import "./App.css";
import ScoreItem from "./ScoreItem.js";

class ScoreTable extends Component {
  render() {
    const users = this.props.users;
    const scoreItems = users && users.map((user, index) =>
      <ScoreItem key={user.id} rank={index + 1} name={user.name} score={user.score} />
    );

    return (
      <div className="ScoreTable">
        {scoreItems}
      </div>
    );
  }
}

export default ScoreTable;
