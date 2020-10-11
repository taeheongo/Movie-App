import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { MOVIE_FRAGMENT } from "../hoc/auth";
import YoutubePlayer from "../utils/YoutubePlayer";
import Loading from "../utils/Loading";
import "./MoviePage.css";

export const getMovie = gql`
  query movie($movieId: ID!) {
    movie(movieId: $movieId) {
      ...movieFragment
    }
  }
  ${MOVIE_FRAGMENT}
`;

const MoviePage = ({ history }) => {
  const { _id } = useParams();

  const { data } = useQuery(getMovie, {
    variables: {
      movieId: _id,
    },
  });

  console.log("movie: ", data);

  const addToCartHandler = () => {};

  return data?.movie ? (
    <main>
      <section className="movie-section">
        <div className="movie-info">
          <div className="movie-info-item">
            <h2 className="movie-title">
              {data.movie.title} - {data.movie.subtitle}
            </h2>
          </div>
          <div className="movie-info-item">
            <span>Actors: </span>
            <div>
              {data.movie.actors.map((actor, i) => (
                <span key={i}>{`${actor} `}</span>
              ))}
            </div>
          </div>
          <div className="movie-info-item">
            <span>Directors: </span>
            {data.movie.directors.map((director, i) => (
              <span key={i}>{`${director} `}</span>
            ))}
          </div>
          <div className="movie-info-item">
            <span>PubDate: </span>
            <span>{data.movie.pubDate}</span>
          </div>
          <div className="movie-info-item">
            <span>Rating: </span>
            <span>{data.movie.rating}</span>
          </div>
          <div className="movie-info-item">
            <button
              type="click"
              className="addtocart-button"
              onClick={addToCartHandler}
            >
              AddToCart
            </button>
          </div>
        </div>
        <img className="movie-poster" src={data.movie.image} alt="poster" />
      </section>
      <div className="movie-preview">
        <h6>Preview</h6>
        <YoutubePlayer src={data.movie.trailor} title={data.movie} />
      </div>
    </main>
  ) : (
    <Loading />
  );
};

export default MoviePage;
