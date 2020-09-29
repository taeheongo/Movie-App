import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  gql,
} from "@apollo/client";
import { typeDefs } from "./schema";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: { authorization: localStorage.getItem("token") },
    uri: "http://localhost:4001/graphql",
  }),
  typeDefs,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

client.cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: false,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
