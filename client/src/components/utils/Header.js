import React from "react";
import LoginButton from "./LoginButton";
import { Link, withRouter } from "react-router-dom";

import "./Header.css";

const Header = () => {
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
      <div className="menu">
        <div className="menu-item">
          <LoginButton />
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
