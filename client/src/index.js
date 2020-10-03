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

const cookieParser = (cookies) => {
  let cookieObject = {};

  cookies.split(";").forEach((cookie) => {
    let parsedCookie = cookie.trim().split("=");
    cookieObject[parsedCookie[0]] = parsedCookie[1];
  });

  return cookieObject;
};

console.log(
  localStorage.getItem("token") || cookieParser(document.cookie)["token"]
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      auth:
        localStorage.getItem("token") || cookieParser(document.cookie)["token"],
    },
    uri: "http://localhost:4000/graphql",
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
