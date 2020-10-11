import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import { IS_LOGGED_IN } from "../../index";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Header.css";

const Header = ({ history }) => {
  const { data } = useQuery(IS_LOGGED_IN);

  const RightMenu = data?.isLoggedIn ? (
    <div className="menu">
      <div className="menu-item">
        <Link to="/">Home</Link>
      </div>
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
        <LogoutButton />
      </div>
    </div>
  ) : (
    <div className="menu">
      <div className="menu-item">
        <Link to="/">Home</Link>
      </div>
      <div className="menu-item">
        <LoginButton />
      </div>
      <div className="menu-item">
        <Link to="/signup">Sign Up</Link>
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
