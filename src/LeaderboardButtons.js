import React, { Component } from "react";
import "./App.css";
import Button from "./Button.js";

class LeaderboardButtons extends Component {
  render() {
    const authenticatedUser = this.props.authenticatedUser;

    const buttons = [];
    if (!authenticatedUser) {
      buttons.push(<Button key="Log In" action="Log In" onClick={this.props.onLogin} />);
      buttons.push(<Button key="Register" action="Register" invertedColor="true" onClick={this.props.onRegister} />)

    } else {
       buttons.push(<Button key="New Game" action="New Game" onClick={this.props.onNewGame} />);
    }

    const className = (this.props.inactive ? "LeaderboardButtons inactive" : "LeaderboardButtons");

    return (
      <div className={className}>
        {authenticatedUser
          ? <div className="welcome">Hello {this.props.authenticatedUser}, nice to see you again!</div>
          : null
        }
        {buttons}
        {authenticatedUser
          ? null
          : <div className="instructions">Login or register to start new game.</div>
        }
      </div>
    );
  }
}

export default LeaderboardButtons;
