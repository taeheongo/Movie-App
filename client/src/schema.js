import { gql } from "@apollo/client";

// To build a client schema, we extend the types of our server schema
//  and wrap it with the gql function
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;
