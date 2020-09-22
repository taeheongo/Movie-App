import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 30,
    trim: true,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  pubDate: {
    type: Number,
    required: true,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
