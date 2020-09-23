import mongoose from "mongoose";
import { User } from "./dataSources/models/User";
import { AuthenticationError } from "apollo-server";
import axios from "axios";

export const isEmail = (email) => {
  if (typeof email !== "string") {
    return false;
  }

  if (email.match(/[\w\d]+@[\w\d]+\.{1}\w/)) {
    return true;
  } else {
    return false;
  }
};

export const connectToDB = (username, password) => {
  const mongodbURI = `mongodb+srv://${username}:${password}@cluster-for-movie-app.3qupe.mongodb.net/movie?retryWrites=true&w=majority`;

  const DBConnectionSuccess = () =>
    console.log(`🚀 Connected to Mongodb Atlas Cluster`);

  const DBConnectonFailed = (error) => console.error(error);

  //connect to mongodb atlas cluster

  mongoose
    .connect(mongodbURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(DBConnectionSuccess)
    .catch(DBConnectonFailed);
};

export const auth = async (token) => {
  if (!token) {
    return null;
  }

  let user;
  try {
    user = await User.findByToken(token);

    if (!user) return null;

    return user;
  } catch (error) {
    if (error.message === "jwt expired") {
      throw AuthenticationError("Login required.");
    } else {
      throw error;
    }
  }
};

export const getMovieNames = async () => {
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
};
