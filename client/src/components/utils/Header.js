import React, { useEffect } from "react";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import {
  gql,
  useLazyQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import "./Header.css";

export const GET_IS_LOGGED_IN = gql`
  query getIsLoggedIn {
    isLoggedIn @client
  }
`;

export const LOG_OUT = gql`
  mutation logout {
    logout
  }
`;

const Header = ({ history }) => {
  const client = useApolloClient();
  const [getIsLoggedIn, isLoggedInResult] = useLazyQuery(GET_IS_LOGGED_IN);
  const [logout, logoutResult] = useMutation(LOG_OUT, {
    onCompleted(data) {
      console.log("oncompleted: ", data);
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
    },
  });
  const logoutClickHanlder = () => {
    localStorage.removeItem("token");
    logout();
  };

  useEffect(() => {
    getIsLoggedIn();
  }, []);

  useEffect(() => {
    if (logoutResult.data) {
      getIsLoggedIn();
    }
  }, [logoutResult.data]);

  const RightMenu = isLoggedInResult.data?.isLoggedIn ? (
    <div className="menu">
      <div className="menu-item">
        <Link to="/cart">
          <Badge count={5}>
            <ShoppingCartOutlined style={{ height: "2rem", width: "2rem" }} />
          </Badge>
        </Link>
      </div>
      <div className="menu-item">
        <Link to="/profile">Profile</Link>
      </div>
      <div className="menu-item">
        <button className="pure-button" onClick={logoutClickHanlder}>
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div className="menu">
      <div className="menu-item">
        <LoginButton />
      </div>
    </div>
  );

  return (
    <header className="header">
      <div className="menu">
        <div className="menu-item">
          <Link to="/">
            <img src="logo.png" alt="movie-app" className="menu-logo" />
          </Link>
        </div>
        <div className="menu-item">
          <a
            href="https://github.com/taeheongo/Movie-App"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src="github.png" alt="github" className="menu-logo" />
          </a>
        </div>
      </div>
      {RightMenu}
    </header>
  );
};

export default Header;
