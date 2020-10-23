import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type Query {
    me: User
    movie(movieId: ID!): Movie!
    movies(movieIds: [ID]!): [Movie]!
    currentMovies: [Movie]!
  }

  type User {
    _id: ID!
    username: String!
    email: String
    movies: [Item]!
    role: Int!
    token: String!
    cart: [Item]!
  }

  type Movie {
    title: String
    subtitle: String
    image: String
    rating: Float
    directors: [String]
    actors: [String]
    pubDate: String
    trailor: String
    _id: ID!
  }

  type Result {
    success: Boolean!
    message: String
  }

  type Item {
    _id: ID!
    quantity: Int!
    title: String
    image: String
  }

  type Mutation {
    register(email: String!, username: String!, password: String!): Result!
    login(email: String!, password: String!): Result!
    logout: Boolean!
    book(movieIds: [ID]!): Result!
    addToCart(movieId: ID!): Result!
    removeFromCart(movieId: ID!): Result!
  }
`;

export default typeDefs;
