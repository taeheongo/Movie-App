import { DataSource } from "apollo-datasource";
import { AuthenticationError } from "apollo-server";
import { User } from "./models/User";
import { auth } from "../utils";

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
}

export default UserAPI;
