import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloLink, from, HttpLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";
import App from "./App.js";
import * as serviceWorker from './serviceWorker';

const httpLink = new HttpLink({
  uri: "https://hiring-backend-2048.herokuapp.com/admin/api",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = window.sessionStorage.getItem('token');
  // add the authorization to the headers
  if (token) {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
