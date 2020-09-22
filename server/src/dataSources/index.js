import MovieAPI from "./movie";
import UserAPI from "./user";

const dataSources = () => ({
  MovieAPI: new MovieAPI(),
  UserAPI: new UserAPI(),
});

export default dataSources;
