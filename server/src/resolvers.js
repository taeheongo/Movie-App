import { UserInputError } from "apollo-server";
import { isEmail } from "./utils";

export default {
  Query: {
    getMovies: async (_, { name, limit }, { dataSources }) => {
      const response = await dataSources.MovieAPI.getMovies(name, limit);

      return response;
    },
    getHotMovies: async (_, __, { dataSources }) => {
      let movies = await dataSources.MovieAPI.getHotMovies();
      console.log(movies);
      return movies;
    },
  },
  Mutation: {
    register: async (_, { email, username, password }, { dataSources }) => {
      try {
        if (!isEmail(email)) {
          throw new UserInputError("Invalid email format");
        }

        const isSucceeded = await dataSources.UserAPI.register(
          email,
          username,
          password
        );

        return isSucceeded;
      } catch (error) {
        console.error("Register Error: \n", error);
        throw error;
      }
    },
    login: async (_, { email, password }, { dataSources }) => {
      try {
        if (!isEmail(email)) {
          throw new UserInputError("Invalid email format");
        }

        let user = await dataSources.UserAPI.login(email, password);

        return user;
      } catch (error) {
        console.error("Login Error: \n", error);
        throw error;
      }
    },
    logout: async (_, __, { dataSources }) => {
      try {
        let isLoggedOut = dataSources.UserAPI.logout();

        return isLoggedOut;
      } catch (error) {
        onsole.error("Login Error: \n", error);
        throw error;
      }
    },
  },
};
