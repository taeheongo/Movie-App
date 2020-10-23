import React from "react";
import { gql, useMutation } from "@apollo/client";

import Loading from "../utils/Loading";

const ProfilePage = ({ user, refetch }) => {
  return user?.movies ? (
    <main>
      <h1>My Movies</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user.movies.map((movie, i) => (
            <tr key={i}>
              <td>{movie.title}</td>
              <td>
                {
                  <a href={`/movie/${movie._id}`}>
                    <img
                      src={movie.image}
                      className="cart-table-img"
                      alt={movie.title}
                    />
                  </a>
                }
              </td>
              <td>{movie.quantity}</td>
              <td>booked</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  ) : (
    <Loading />
  );
};

export default ProfilePage;
