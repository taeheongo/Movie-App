import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type Query {
    me: User!
    movie(movieId: ID!): Movie!
    movies(movieIds: [ID]!): [Movie]!
    currentMovies: [Movie]!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    movies: [Movie]!
    role: Int!
    token: String!
    cart: [Movie]!
  }

  type Movie {
    title: String!
    subtitle: String!
    image: String!
    rating: Float!
    directors: [String]!
    actors: [String]!
    pubDate: String
    trailor: String!
    _id: ID!
  }

  type fetchResult {
    skip: Int!
    limit: Int!
    display: Int!
    hasMore: Boolean!
    movies: [Movie]!
  }

  type Mutation {
    register(email: String!, username: String!, password: String!): Boolean!
    login(email: String!, password: String!): User!
    logout: Boolean!
    book(movieIds: [ID]!): Boolean!
    addOrRemoveItem(movieIds: [ID]!): Boolean!
    test: Boolean!
  }
`;

export default typeDefs;
