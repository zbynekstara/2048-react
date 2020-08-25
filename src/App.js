import React, { Component } from "react";
import "./App.css";
import GameScreen from "./GameScreen.js";
import LeaderboardScreen from "./LeaderboardScreen.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.onNewGame = this.onNewGame.bind(this);

    this.state = {
      showGame: false,
    };
  }

  onNewGame() {
    this.setState({
      showGame: true
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.showGame
          ? <GameScreen />
          : <LeaderboardScreen onNewGame={this.onNewGame} />
        }
      </div>
    );
  }
}

export default App;
