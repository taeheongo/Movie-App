import { isEmail } from "./utils";

export default {
  Query: {
    getMovie: async (_, { name }, { dataSources }) => {
      try {
        const response = await dataSources.MovieAPI.getMovie(name);
        const { total, start, display, items } = response;

        items.map((item) => {
          const actors = item.actor.split("|");

          item.actor = actors.filter((item) => item !== "");
          return item.actor;
        });

        return {
          total,
          start,
          display,
          movies: items,
          hasMore: true,
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (_, { email, username, password }, { dataSources }) => {
      if (!isEmail(email)) {
        return { success: false };
      }
      const { success, message } = await dataSources.UserAPI.register(
        email,
        username,
        password
      );
      console.log(success, message);
      return { success, message };
    },
  },
};
