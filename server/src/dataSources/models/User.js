import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { ObjectId } = mongoose.Schema.Types;

const saltRounds = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  role: {
    type: Number, // 0: client account, 1: administrator account
    default: 0,
  },
  movies: {
    type: [{ type: ObjectId, ref: "Movie" }],
    default: [],
  },
  cart: {
    type: [{ type: ObjectId, ref: "Movie" }],
    default: [],
  },
  githubId: String,
  token: String,
  tokenExp: Date,
});

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    // Encrypt password
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  const user = this;

  const result = await bcrypt
    .compare(plainPassword, user.password)
    .then((isMatch) => isMatch);

  return result;
};

userSchema.methods.generateToken = async function () {
  let user = this;

  // Genreate token
  const token = jwt.sign(
    { data: user._id.toHexString() },
    process.env.JWTSECRET,
    { expiresIn: "6h" }
  );

  // Add token and token expiration to user
  user.token = token;
  const sixHours = Date.now() + 1000 * 60 * 60 * 6;
  user.tokenExp = sixHours;

  // Save the user
  await user.save();

  user = {
    _id: user._id.toHexString(),
    email: user.email,
    username: user.username,
    movies: user.movies,
    cart: user.cart,
    token: user.token,
    tokenExp: user.tokenExp,
    role: user.role,
  };
  return user;
};

// Schema method used to find user by token.
// It will check if the token is still valid and find the user
userSchema.statics.findByToken = async function (token) {
  const User = this;

  // Decode token.
  // If token is expired, error will be 'jwt expired' error.
  const decoded = jwt.verify(token, process.env.JWTSECRET);

  // If token is still valid, find the user.
  const user = await User.findOne(
    { _id: decoded.data, token: token },
    { password: 0 }
  );

  return user;
};

export const User = mongoose.model("User", userSchema);
