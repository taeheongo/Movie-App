import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type Query {
    me: User!
    movie(name: String!): Movie!
    movies(name: String!, limit: Int): fetchResult!
    hotMovies: [Movie]!
  }

  type User {
    _id: String!
    username: String!
    email: String!
    movies: [Movie]!
    role: Int!
    token: String
    tokenExp: Date
  }

  type Movie {
    title: String!
    subtitle: String!
    image: String!
    link: String!
    userRating: Float!
    director: [String]!
    actor: [String]!
    pubDate: String!
    videoId: String
    _id: String
  }

  type fetchResult {
    total: Int
    start: Int
    display: Int
    hasMore: Boolean
    movies: [Movie]
  }

  type Mutation {
    register(email: String!, username: String!, password: String!): Boolean!
    login(email: String!, password: String!): User!
    logout: Boolean!
  }
`;

export default typeDefs;
