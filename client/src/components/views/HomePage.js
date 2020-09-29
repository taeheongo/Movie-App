import React from "react";
import { gql, useQuery } from "@apollo/client";
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
    }
  }
`;

const HomePage = ({ history }) => {
  const { data, loading, error } = useQuery(getCurrentMovies);

  console.log(data, loading, error);

  return (
    <main style={{ margin: "auto", paddingBottom: "3rem" }}>
      <Logo className="home-logo" history={history} />
      <h1 className="home-title">Life is short, just watch your movies</h1>
      <div className="hotmovies-container">
        {data ? (
          data.currentMovies.map((movie, i) => {
            const onClick = () => {
              history.push(`/${movie._id}`);
            };

            return <Movie key={i} onClick={onClick} {...movie} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
};

export default HomePage;
