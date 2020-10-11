import React from "react";

import { gql, useMutation, useApolloClient } from "@apollo/client";

export const LOG_OUT = gql`
  mutation logout {
    logout
  }
`;

const LogoutButton = () => {
  const client = useApolloClient();

  const [logout] = useMutation(LOG_OUT, {
    onCompleted(result) {
      if (result.logout) {
        client.cache.modify({
          fields: {
            isLoggedIn() {
              return false;
            },
            me() {
              return null;
            },
          },
        });
      }
    },
  });

  const logoutClickHanlder = () => logout();

  return (
    <button className="pure-button" onClick={logoutClickHanlder}>
      Logout
    </button>
  );
};

export default LogoutButton;
