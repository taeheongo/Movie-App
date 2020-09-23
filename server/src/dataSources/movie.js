import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from "dotenv";

// loads environment variables from a .env file into process.env
dotenv.config();

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://openapi.naver.com/v1/search";
  }

  willSendRequest(request) {
    request.headers.set("X-Naver-Client-Id", process.env.NaverClientId);
    request.headers.set("X-Naver-Client-Secret", process.env.NaverClientSecret);
  }

  async getMovies(name, limit = 10) {
    const response = await this.get("/movie.json", {
      query: name,
      display: limit,
    });

    const { total, start, display, items } = response;

    items.map((item) => {
      // item.actor and itme.director is string and split by "|"
      const actors = item.actor.split("|");
      actors.splice(actors.length - 1, 1);
      item.actor = actors;

      const directors = item.director.split("|");
      directors.splice(directors.length - 1, 1);
      item.director = directors;

      // remove <b>, </b> in item.title
      item.title = item.title.replace(/<b>(.*?)<\/b>/, "$1");

      return item;
    });

    return {
      total,
      start,
      display,
      movies: items,
      hasMore: true,
    };
  }

  async getHotMovies() {
    const promises = this.context.movieNames.map((name) => {
      return this.getMovies(name, 1);
    });

    let movies = await Promise.all(promises);

    movies = movies.map((item) => item.movies[0]);

    return movies;
  }
}

export default MovieAPI;
