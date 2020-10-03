import { UserInputError, AuthenticationError } from "apollo-server-express";
import { isEmail, auth } from "./utils";

export default {
  Query: {
    movie: async (_, { movieId }, { dataSources }) => {
      const movie = await dataSources.MovieAPI.getMovie(movieId);

      return movie;
    },
    movies: async (_, { movieIds }, { dataSources }) => {
      const response = await dataSources.MovieAPI.getMovies(movieIds);

      return response;
    },
    currentMovies: async (_, __, { dataSources }) => {
      let movies = await dataSources.MovieAPI.getCurrentMovies();

      return movies;
    },
    me: async (_, __, { token }) => {
      console.log("token", token);
      let user = await auth(token);

      return user;
    },
  },
  Mutation: {
    register: async (_, { email, username, password }, { dataSources }) => {
      if (!isEmail(email)) {
        throw new UserInputError("Invalid email format");
      }

      const isSucceeded = await dataSources.UserAPI.register(
        email,
        username,
        password
      );

      return isSucceeded;
    },
    login: async (_, { email, password }, { dataSources }) => {
      if (!isEmail(email)) {
        throw new UserInputError("Invalid email format");
      }

      let user = await dataSources.UserAPI.login(email, password);

      return {
        user,
      };
    },
    logout: async (_, __, { dataSources }) => {
      let isLoggedOut = await dataSources.UserAPI.logout();

      return isLoggedOut;
    },
    book: async (_, { movieIds }, { dataSources }) => {
      let isBooked = await dataSources.UserAPI.book(movieIds);

      return isBooked;
    },
    addOrRemoveItem: async (_, { movieIds }, { dataSources }) => {
      let isSucceeded = await dataSources.UserAPI.addToCartOrRemoveFromCart(
        movieIds
      );

      return isSucceeded;
    },
  },
};
