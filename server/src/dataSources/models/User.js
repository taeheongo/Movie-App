import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    type: Array,
    default: [],
  },
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

userSchema.methods.comparePassword = function (plainPassword, cb) {
  let user = this;

  bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;

  // Genreate token
  const token = jwt.sign(
    { data: user._id.toHexString() },
    process.env.JWTSECRET,
    { expiresIn: "6h" }
  );

  // Add token and token expiration to user
  user.token = token;
  const sixHours = new Date().valueOf(Date.now() + 1000 * 60 * 60 * 6);
  user.tokenExp = sixHours;

  // Save the user
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// Schema method used to find user by token.
// It will check if the token is still valid and find the user
userSchema.statics.findByToken = function (token, cb) {
  let User = this;

  // Decode token.
  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    // If token is expired, error will be 'jwt expired' error.
    if (err) return cb(err);

    // If token is still valid, find the user.
    User.findOne(
      { _id: decoded.data, token: token },
      { projection: { password: 0 } },
      function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};

export const User = mongoose.model("User", userSchema);
