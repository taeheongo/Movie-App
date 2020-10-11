import React, { useEffect } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";

export const MOVIE_FRAGMENT = gql`
  fragment movieFragment on Movie {
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
`;

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
    _id
    username
    email
    role
    token
    movies {
      ...movieFragment
    }
    cart {
      ...movieFragment
    }
  }
  ${MOVIE_FRAGMENT}
`;

export const Me = gql`
  query me {
    me {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent, option, adminRoute = false) => {
  const client = useApolloClient();

  const HocComponent = ({ ...props }) => {
    const { data } = useQuery(Me);
    console.log("me:", data);

    useEffect(() => {
      if (data && data.me) {
        const { role } = data.me;
        // set isLoggedIn true
        client.cache.modify({
          fields: {
            isLoggedIn() {
              return true;
            },
          },
        });

        if (option === 0) {
          props.history.push("/");
        } else {
          if (adminRoute) {
            if (role === 0) {
              props.history.push("/");
            }
          }
        }
      } else {
        if (option === 1) {
          alert("Login required.");
          props.history.push("/");
        }
      }
    }, [data, props.history]);

    return <WrappedComponent {...props} user={data?.me} />;
  };

  return HocComponent;
};
