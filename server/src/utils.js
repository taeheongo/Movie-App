import mongoose from "mongoose";
import { User } from "./dataSources/models/User";

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
  const mongodbURI = `mongodb+srv://${username}:${password}@cluster-for-movie-app.3qupe.mongodb.net/user?retryWrites=true&w=majority`;

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

export const auth = (token) => {
  console.log("token:", token);
  if (!token) {
    return { user: null, message: "no token detected" };
  }

  User.findBytoken(token, (error, user) => {
    console.log(error, user);
    if (error) {
      if (error.message === "jwt expired") {
        return { message: "token expired", user: null };
      } else {
        console.error("findBytoken :", error);
        return { message: "internal error", user: null };
      }
    }

    if (!user) {
      return { message: "check your information", user: null };
    }

    if (user) {
      return { user };
    }
  });
};
