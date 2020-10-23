import React from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
    _id
    username
    email
    role
    token
    movies {
      _id
      quantity
      image
      title
    }
    cart {
      _id
      quantity
      title
      image
    }
  }
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
    const { data, refetch } = useQuery(Me, {
      onCompleted({ me }) {
        if (me) {
          const { role } = me;
          console.log("me:", me);

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
      },
    });

    return <WrappedComponent {...props} user={data?.me} refetch={refetch} />;
  };

  return HocComponent;
};
