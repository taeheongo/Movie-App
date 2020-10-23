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

export const connectToDB = () => {
  const mongodbURI = process.env.MONGODB_URI;

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
      user = null;
    } else {
      throw error;
    }
  }
  return user;
};

export const validPassword = (password) => {
  return /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])/.test(password);
};
