import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "./App.css";
import GameMatrix from "./GameMatrix.js";

const NEW_GAME = gql`
  query NewGame {
    newGame {
      state,
      score,
      finished
    }
  }
`

class GameScreen extends Component {
  render() {
    return (
      <Query query={NEW_GAME}>
        {({ loading, error, data }) => (
          <div className="GameScreen">
            <h1>Game</h1>
            {loading
              ? <p>Loading game data...</p>
              : <GameMatrix gameData={data.newGame} />
            }
          </div>
        )}
      </Query>
    );
  }
}

export default GameScreen;
