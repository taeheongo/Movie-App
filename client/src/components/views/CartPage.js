import React from "react";
import { gql, useMutation } from "@apollo/client";

import Loading from "../utils/Loading";
import "./CartPage.css";

export const removeItem = gql`
  mutation removeItem($movieId: ID!) {
    removeFromCart(movieId: $movieId) {
      success
      message
    }
  }
`;

export const bookItems = gql`
  mutation bookItems($movieIds: [ID]!) {
    book(movieIds: $movieIds) {
      success
      message
    }
  }
`;

const CartPage = ({ user, refetch }) => {
  const [removeFromCart] = useMutation(removeItem, {
    onCompleted() {
      refetch();
    },
  });

  const [book] = useMutation(bookItems, {
    onCompleted() {
      refetch();
    },
  });

  const onCancelHandler = (event) => {
    removeFromCart({
      variables: {
        movieId: event.currentTarget.dataset.id,
      },
    });
  };

  const onBookHandler = () => {
    const movieIds = user.cart.map((cartItem) => cartItem._id);
    book({
      variables: {
        movieIds,
      },
    });
  };

  return user?.cart ? (
    <main>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {user.cart.map((cartItem) => (
            <tr key={cartItem._id}>
              <td>{cartItem.title}</td>
              <td>
                {
                  <a href={`/movie/${cartItem._id}`}>
                    <img
                      src={cartItem.image}
                      className="cart-table-img"
                      alt={cartItem.title}
                    />
                  </a>
                }
              </td>
              <td>{cartItem.quantity}</td>
              <td>
                <button
                  onClick={onCancelHandler}
                  data-id={cartItem._id}
                  className="cart-cancel-button"
                >
                  cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="book-button-box">
        <button onClick={onBookHandler} className="book-button">
          Book
        </button>
      </div>
    </main>
  ) : (
    <Loading />
  );
};

export default CartPage;
