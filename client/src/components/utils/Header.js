import React from "react";
import { useQuery } from "@apollo/client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import { IS_LOGGED_IN } from "../../index";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Header.css";
import logo from "./images/logo.png";
import github from "./images/github.png";

const Header = ({ history }) => {
  const { data } = useQuery(IS_LOGGED_IN);

  const RightMenu = data?.isLoggedIn ? (
    <div className="menu">
      <div className="menu-item">
        <a href="/">Home</a>
      </div>
      <div className="menu-item">
        <a href="/cart">
          <Badge count={5}>
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
