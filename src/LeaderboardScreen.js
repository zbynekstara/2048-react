import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import "./App.css";
import Leaderboard from "./Leaderboard.js";
import LoginModal from "./LoginModal.js";
import Registration from "./Registration.js";

const ADD_USER = gql`
  mutation AddUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

const AUTH_USER = gql`
  mutation AuthUser($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token,
      item {
        name
      }
    }
  }
`;

class LeaderboardScreen extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);

    this.state = {
      authenticatedUser: "", // "" = no authenticated user
      showLogin: false,
      showRegister: false
    };
  }

  onLogin() {
    console.log("LeaderboardScreen: onLogin");
    this.setState({
      showLogin: true
    });
  }

  onLoginSubmit = (authUser) => (email, password) => {
    console.log("LeaderboardScreen: onLoginSubmit", email, password);
    this.setState({
      showLogin: false
    });
    authUser({
      variables: {
        email,
        password
      }
    }).then((resolve) => {
      console.log("LeaderboardScreen: onLoginSubmit: then", resolve);
      const { data } = resolve;
      const { authenticateUserWithPassword } = data;
      const { token, item } = authenticateUserWithPassword;
      const { name } = item;
      window.sessionStorage.setItem('token', token);
      this.setState({
        authenticatedUser: name,
      });
    });
  }

  onRegister() {
    console.log("LeaderboardScreen: onRegister");
    this.setState({
      showRegister: true
    });
  }

  onRegisterSubmit = (addUser, authUser) => (firstName, lastName, email, password) => {
    console.log("LeaderboardScreen: onRegisterSubmit", firstName, lastName, email, password);
    this.setState({
      showRegister: false
    });
    addUser({
      variables: {
        data: {
          name: ((firstName && lastName) ? (firstName + " " + lastName) : ((firstName || lastName) ? (firstName || lastName) : email)),
          email,
          password
        }
      }
    }).then(() => {
      authUser({
        variables: {
          email,
          password
        }
      }).then((resolve) => {
        const { data } = resolve;
        const { authenticateUserWithPassword } = data;
        const { token, item } = authenticateUserWithPassword;
        const { name } = item;
        window.sessionStorage.setItem('token', token);
        this.setState({
          authenticatedUser: name,
        });
      });
    });
  }

  render() {
    return (
      <Mutation mutation={ADD_USER}>
        {(addUser) => (
          <Mutation mutation={AUTH_USER}>
            {(authUser) => (
              <div className="LeaderboardScreen">
                {this.state.showLogin
                  ? <LoginModal onSubmit={this.onLoginSubmit(authUser)} />
                  : null
                }
                <h1>2048</h1>
                {this.state.showRegister
                  ? <Registration onSubmit={this.onRegisterSubmit(addUser, authUser)} />
                  : <Leaderboard inactive={this.state.showLogin} authenticatedUser={this.state.authenticatedUser} onLogin={this.onLogin} onRegister={this.onRegister} onNewGame={this.props.onNewGame} />
                }
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default LeaderboardScreen;
