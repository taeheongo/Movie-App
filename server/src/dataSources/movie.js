import { RESTDataSource } from "apollo-datasource-rest";
import axios from "axios";

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://openapi.naver.com/v1/search";
  }

  willSendRequest(request) {
    request.headers.set("X-Naver-Client-Id", process.env.NaverClientId);
    request.headers.set("X-Naver-Client-Secret", process.env.NaverClientSecret);
  }

  async getMovie(name) {
    const { movies } = await this.getMovies(name, 1);

    await this.addTrailor(movies[0]);

    return movies[0];
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
      item.subtitle = item.subtitle.replace(/<b>(.*?)<\/b>/, "$1");

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
    // We will use Promise.all to get an array of the asynchronus results.
    const movieNames = await this.getMovieNames();

    const promises = movieNames.map((name) => {
      return this.getMovies(name, 1);
    });

    let movies = await Promise.all(promises);

    movies = movies.map((item) => item.movies[0]);

    return movies;
  }

  async addTrailor(movie) {
    const YOUTUBE_V3_URI = "https://www.googleapis.com/youtube/v3/search";

    const query = `${movie.subtitle} official trailor ${movie.pubDate}`;

    const { data } = await axios.get(YOUTUBE_V3_URI, {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: query,
        maxResults: 1,
      },
    });

    movie.videoId = data.items[0]?.id?.videoId;

    return true;
  }

  // get hot movie names;
  async getMovieNames() {
    const year = `${new Date().getFullYear()}`;
    const month = `0${new Date().getMonth() + 1}`.slice(-2);
    const date = `${new Date().getDate() - 1}`;
    const yesterday = year + month + date;
    const KOBIS_URI = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?`;

    let { data } = await axios.get(KOBIS_URI, {
      params: {
        key: process.env.KOBIS_API_KEY,
        targetDt: yesterday,
      },
    });

    let result = data?.boxOfficeResult?.dailyBoxOfficeList.map(
      (item) => item.movieNm
    );

    return result;
  }
}

export default MovieAPI;
