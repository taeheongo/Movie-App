import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import { IS_LOGGED_IN } from "../../index";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Header.css";
import logo from "./images/logo.png";
import github from "./images/github.png";

const Me = gql`
  query me {
    me {
      cart {
        _id
      }
    }
  }
`;

const Header = ({ history }) => {
  const { data } = useQuery(IS_LOGGED_IN);
  const result = useQuery(Me, {
    pollInterval: 1000,
  });
  const [Count, setCount] = useState(0);

  useEffect(() => {
    if (result?.data?.me?.cart) {
      setCount(result?.data?.me?.cart?.length);
    }
  }, [result.data]);

  const RightMenu = data?.isLoggedIn ? (
    <div className="menu">
      <div className="menu-item">
        <a href="/">Home</a>
      </div>
      <div className="menu-item">
        <a href="/cart">
          <Badge count={Count}>
            <ShoppingCartOutlined style={{ height: "2rem", width: "2rem" }} />
          </Badge>
        </a>
      </div>
      <div className="menu-item">
        <a href="/profile">Profile</a>
      </div>
      <div className="menu-item">
        <LogoutButton />
      </div>
    </div>
  ) : (
    <div className="menu">
      <div className="menu-item">
        <a href="/">Home</a>
      </div>
      <div className="menu-item">
        <LoginButton />
      </div>
      <div className="menu-item">
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  );

  return (
    <header className="header">
      <div className="menu">
        <div className="menu-item">
          <a href="/">
            <img src={logo} alt="movie-app" className="menu-logo" />
          </a>
        </div>
        <div className="menu-item">
          <a
            href="https://github.com/taeheongo/Movie-App"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={github} alt="github" className="menu-logo" />
          </a>
        </div>
      </div>
      {RightMenu}
    </header>
  );
};

export default Header;
