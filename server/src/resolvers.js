import { UserInputError, AuthenticationError } from "apollo-server";
import { isEmail, auth } from "./utils";

export default {
  Query: {
    movie: async (_, { name }, { dataSources }) => {
      const movie = await dataSources.MovieAPI.getMovie(name);

      return movie;
    },
    movies: async (_, { name, limit }, { dataSources }) => {
      const response = await dataSources.MovieAPI.getMovies(name, limit);

      return response;
    },
    hotMovies: async (_, __, { dataSources }) => {
      let movies = await dataSources.MovieAPI.getHotMovies();

      return movies;
    },
    me: async (_, __, { token }) => {
      let user = await auth(token);

      if (!user) {
        throw new AuthenticationError("You are not logged in.");
      }

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

      return user;
    },
    logout: async (_, __, { dataSources }) => {
      let isLoggedOut = dataSources.UserAPI.logout();

      return isLoggedOut;
    },
  },
};
