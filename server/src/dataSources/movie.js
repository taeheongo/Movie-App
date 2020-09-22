const { RESTDataSource } = require("apollo-datasource-rest");
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

  async getMovie(name) {
    console.log("token!:", this.context.token);
    try {
      const response = await this.get("/movie.json", { query: name });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default MovieAPI;
