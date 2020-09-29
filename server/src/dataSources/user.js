import { DataSource } from "apollo-datasource";
import { ApolloError, AuthenticationError } from "apollo-server";
import { User } from "./models/User";
import { auth } from "../utils";
import { Movie } from "./models/Movie";

class UserAPI extends DataSource {
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

  async login(email, password) {
    let user = await auth(this.context.token);

    if (user) {
      throw new AuthenticationError("You are logged in.");
    }

    user = await User.findOne({ email }).populate("cart").populate("movies");

    if (!user) {
      throw new AuthenticationError("The email doesn't exists.");
    }

    let isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new AuthenticationError("The password is not consistent.");
    }

    user = await user.generateToken();

    return user;
  }

  async logout() {
    let user = await auth(this.context.token);

    if (!user) {
      throw new AuthenticationError("You are not logged in.");
    }

    user.token = "";
    user.tokenExp = Date.now();

    await user.save();

    return true;
  }

  async register(email, username, password) {
    let user = await auth(this.context.token);

    if (user) {
      throw new AuthenticationError("You are logged in.");
    }

    user = await User.findOne({ email });

    if (user) {
      throw new AuthenticationError("The email already exists.");
    }

    user = new User({
      email,
      username,
      password,
    });

    await user.save();

    // registered successfully!
    return true;
  }

  async book(movieIds) {
    let user = await auth(this.context.token);

    if (!user) {
      throw new AuthenticationError("You are not logged in.");
    }

    const session = await User.startSession();

    try {
      session.startTransaction();

      const movies = await Movie.find({ _id: { $in: movieIds } }, { _id: 1 });

      if (!movies) {
        throw new ApolloError("No such movies");
      }

      movieIds = movies.map((movie) => movie._id);
      let result = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $addToSet: {
            movies: {
              $each: movieIds,
            },
          },
        },
        {
          session,
        }
      );
      await session.commitTransaction();
      session.endSession();
      return !!result.ok;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async addToCartOrRemoveFromCart(movieIds) {
    let user = await auth(this.context.token);

    if (!user) {
      throw new AuthenticationError("You are not logged in.");
    }

    const session = await User.startSession();

    try {
      session.startTransaction();

      const movies = await Movie.find({ _id: { $in: movieIds } }, { _id: 1 });

      if (!movies) {
        throw new ApolloError("No such movies");
      }

      let moviesToBePushed = [];
      let moviesToBePulled = [];

      movies.forEach((movie) => {
        for (let userMovie of user.cart) {
          if (userMovie.toHexString() === movie._id.toHexString()) {
            moviesToBePulled.push(movie._id);
            break;
          }
        }
        moviesToBePushed.push(movie._id);
      });
      console.log(moviesToBePulled, moviesToBePushed);

      let result = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $push: {
            cart: {
              $each: moviesToBePushed,
            },
          },
        },
        {
          session,
        }
      );

      let result2 = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $pullAll: {
            cart: moviesToBePulled,
          },
        },
        {
          session,
        }
      );

      await session.commitTransaction();
      session.endSession();
      return !!result.ok && !!result2.ok;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

export default UserAPI;
