import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
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
  directors: {
    type: [String],
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
  trailor: {
    type: String,
    required: true,
  },
  pubDate: {
    type: Number,
    required: true,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
