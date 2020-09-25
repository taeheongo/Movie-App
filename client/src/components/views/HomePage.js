import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import Logo from "../utils/Logo";
import Movie from "../utils/Movie";
import Loading from "../utils/Loading";

import "./HomePage.css";

export const getHotMovies = gql`
  query getHotMovies {
    hotMovies {
      title
      subtitle
      image
    }
  }
`;

const HomePage = ({ history }) => {
  const { data, loading, error } = useQuery(getHotMovies);

  console.log(data, loading, error);

  return (
    <main style={{ margin: "auto", paddingBottom: "3rem" }}>
      <Logo className="home-logo" history={history} />
      <h1 className="home-title">Life is short, just watch your movies</h1>
      <div className="hotmovies-container">
        {data ? (
          data.hotMovies.map((movie, i) => {
            const onClick = () => {
              history.push(`/${movie.subtitle}`);
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
