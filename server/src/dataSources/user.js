import { DataSource } from "apollo-datasource";
import { User } from "./models/User";
import { auth } from "../utils";

class UserAPI extends DataSource {
  constructor() {
    super();
    console.log(this.context);
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

  async login() {}

  async logout() {}

  async register(email, username, password) {
    try {
      let { user } = auth(this.context.token);

      if (user) {
        return { success: false, message: "You are logged in" };
      }

      user = await User.findOne({ email });

      if (user) {
        return { success: false, message: "The email already exists" };
      }

      user = new User({
        email,
        username,
        password,
      });

      await user.save();

      return { success: true };
    } catch (error) {
      console.log("Register error:", error);
    }
  }
}

export default UserAPI;
