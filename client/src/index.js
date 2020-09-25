import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4001/",
  cache: new InMemoryCache(),
});

let hotMovies = [];

ReactDOM.render(
  <ApolloProvider client={client}>
    <App result={hotMovies} />
  </ApolloProvider>,
  document.getElementById("root")
);
