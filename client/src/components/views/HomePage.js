import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import Logo from "../utils/Logo";
import Movie from "../utils/Movie";
import Loading from "../utils/Loading";
import "./HomePage.css";

export const getCurrentMovies = gql`
  query getCurrenttMovies {
    currentMovies {
      _id
      title
      subtitle
      image
      rating
      directors
      actors
      pubDate
      trailor
    }
  }
`;

const HomePage = ({ history }) => {
  const { data } = useQuery(getCurrentMovies);

  return (
    <main style={{ margin: "auto", paddingBottom: "3rem" }}>
      <Logo className="home-logo" history={history} />
      <h1 className="home-title">Life is short, just watch your movies</h1>
      <div className="hotmovies-container">
        {data ? (
          data.currentMovies.map((movie, i) => {
            return (
              <Link key={i} to={`/movie/${movie._id}`}>
                <Movie {...movie} />;
              </Link>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
};

export default HomePage;
