import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "./App.css";
import ScoreTable from "./ScoreTable.js";
import LeaderboardButtons from "./LeaderboardButtons.js";

const GET_HIGH_SCORES = gql`
  query GetHighScores {
    allScores(orderBy: "score_DESC") {
      player {
        name
      }
      score
    }
  }
`;

class Leaderboard extends Component {
  getUsers(data) {
    const users = data && data.allScores && data.allScores.map((score, index) => ({
      id: (index + score.score + ''),
      rank: index,
      name: score.player.name,
      score: score.score
    }));
    return users;
  }

  render() {
    return (
      <Query query={GET_HIGH_SCORES}>
        {({ loading, error, data }) => (
          <div className="Leaderboard">
            <h1>Leaderboard</h1>
            {loading
              ? <p>Loading data...</p>
              : <ScoreTable users={this.getUsers(data)}/>
            }
            <LeaderboardButtons inactive={this.props.inactive} authenticatedUser={this.props.authenticatedUser} onLogin={this.props.onLogin} onRegister={this.props.onRegister} onNewGame={this.props.onNewGame}/>
          </div>
        )}
      </Query>
    );
  }
}

export default Leaderboard;
