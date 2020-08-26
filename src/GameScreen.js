import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query, Mutation } from "@apollo/client/react/components";
import "./App.css";
import Game from "./Game.js";

const NEW_GAME = gql`
  query NewGame {
    newGame {
      state,
      score,
      finished
    }
  }
`

const PROCESS_GAME = gql`
  mutation ProcessGame($game: GameInput!) {
    processGame(game: $game) {
      state,
      score,
      finished
    }
  }
`;

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.gameScreen = React.createRef();

    this.onNewGame = this.onNewGame.bind(this);

    this.state = {
      gameData: null
    }
  }

  componentDidMount() {
    this.gameScreen.current.focus();
  }

  onNewGame() {
    console.log('GameScreen: onNewGame');
  }

  onKeyDown = (processGame, data) => (evt) => {
    if (!data) return; // game is not initialized yet

    let direction;
    const key = evt.key;
    switch(key) {
      case "ArrowLeft":
        direction = "Left";
        break;
      case "ArrowUp":
        direction = "Up";
        break;
      case "ArrowRight":
        direction = "Right";
        break;
      case "ArrowDown":
        direction = "Down";
        break;
      default:
        return;
    }

    processGame({
      variables: {
        game: {
          state: data.state,
          score: data.score,
          direction
        }
      }
    }).then((resolve) => {
      const { data } = resolve;
      const { processGame } = data;
      const { state, score } = processGame;

      const bestScore = window.sessionStorage.getItem("bestScore");
      if (score > bestScore) window.sessionStorage.setItem("bestScore", score);

      this.setState({
        gameData: {
          state,
          score
        }
      });
    });
  }

  render() {
    return (
      <Query query={NEW_GAME}>
        {({ loading, error, data }) => (
          <Mutation mutation={PROCESS_GAME}>
            {(processGame) => (
              <div className="GameScreen" ref={this.gameScreen} tabIndex="-1" onKeyDown={this.onKeyDown(processGame, this.state.gameData || (!loading && data.newGame))}>
                {loading
                  ? <p>Loading game data...</p>
                  : <Game gameData={this.state.gameData || data.newGame} onNewGame={this.onNewGame} />
                }
              </div>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default GameScreen;
