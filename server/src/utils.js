import mongoose from "mongoose";
import { User } from "./dataSources/models/User";
import { AuthenticationError } from "apollo-server";

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
