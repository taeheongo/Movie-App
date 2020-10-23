import { DataSource } from "apollo-datasource";
import { ApolloError, AuthenticationError } from "apollo-server-express";
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

    user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "The email doesn't exists.",
      };
    }

    let isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return {
        success: false,
        message: "The password is not consistent.",
      };
    }

    user = await user.generateToken();

    this.context.res.cookie("token", user.token);
    return {
      success: true,
    };
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
      return {
        success: false,
        message: "You are logged in.",
      };
    }

    user = await User.findOne({ email });

    if (user) {
      return {
        success: false,
        message: "The email already exists.",
      };
    }

    user = new User({
      email,
      username,
      password,
    });

    await user.save();

    // registered successfully!
    return { success: true };
  }

  async book(movieIds) {
    let user = await auth(this.context.token);

    if (!user) {
      return {
        success: false,
        message: "Login required",
      };
    }

    const session = await User.startSession();
    let movies = user.cart.filter((cartItem) =>
      movieIds.includes(cartItem._id.toHexString())
    );
    let ids = movies.map((movie) => movie._id);
    console.log(movies);
    try {
      session.startTransaction();
      let result = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $pull: {
            cart: {
              _id: {
                $in: ids,
              },
            },
          },
        },
        {
          session,
        }
      );

      result = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $push: {
            movies: {
              $each: movies,
            },
          },
        },
        {
          session,
        }
      );

      await session.commitTransaction();
      session.endSession();
      if (!result.ok) {
        return {
          success: false,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async addToCart(movieId) {
    let user = await auth(this.context.token);

    if (!user) {
      return {
        success: false,
        message: "Login required.",
      };
    }

    const session = await User.startSession();

    try {
      session.startTransaction();

      const movie = await Movie.findOne(
        { _id: movieId },
        { _id: 1, image: 1, title: 1 }
      );

      const isInCart = user.cart.some(
        (cartItem) => cartItem._id.toHexString() === movie._id.toHexString()
      );

      let result;
      if (isInCart) {
        result = await User.updateOne(
          {
            _id: user._id,
            "cart._id": movie._id,
          },
          {
            $inc: { "cart.$.quantity": 1 },
          }
        );
      } else {
        result = await User.updateOne(
          {
            _id: user._id,
          },
          {
            $push: {
              cart: {
                _id: movie._id,
                quantity: 1,
                title: movie.title,
                image: movie.image,
              },
            },
          },
          {
            session,
          }
        );
      }

      await session.commitTransaction();
      session.endSession();

      if (!result.ok) {
        return {
          success: false,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async removeFromCart(movieId) {
    let user = await auth(this.context.token);

    if (!user) {
      return {
        success: false,
        message: "Login required.",
      };
    }

    const session = await User.startSession();

    try {
      session.startTransaction();

      const isInCart = user.cart.some(
        (cartItem) => cartItem._id.toHexString() === movieId
      );

      let result;
      if (isInCart) {
        result = await User.updateOne(
          {
            _id: user._id,
            "cart._id": movieId,
          },
          {
            $pull: {
              cart: {
                _id: movieId,
              },
            },
          },
          {
            session,
          }
        );
      } else {
        session.endSession();
        return { success: false, message: "Not in cart" };
      }

      await session.commitTransaction();
      session.endSession();

      if (!result.ok) {
        return {
          success: false,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

export default UserAPI;
