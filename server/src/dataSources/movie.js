import { DataSource } from "apollo-datasource";
import { ApolloError } from "apollo-server";
import { Movie } from "./models/Movie";

class MovieAPI extends DataSource {
  constructor() {
    super();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async getMovies(movieIds) {
    const movies = await Movie.find({ _id: { $in: movieIds } });

    return movies;
  }

  async getMovie(movieId) {
    const movie = await Movie.findById(movieId);

    return movie;
  }

  async getCurrentMovies() {
    const movies = await Movie.find({});

    if (!movies) {
      throw new ApolloError("Error in the trigger");
    }

    return movies;
  }
}

export default MovieAPI;
