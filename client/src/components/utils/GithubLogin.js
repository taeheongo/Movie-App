import React from "react";

import github from "./images/github.png";
import "./GithubLogin.css";

const GithubLogin = ({ clientId }) => {
  // Redirect the user to Github login uri and you'll get request code by query params following redirect uri.
  const GithubURI = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;

  return (
    <button className="github-login" style={{ color: "#fff" }}>
      <a href={GithubURI}>
        <img src={github} alt="github" /> login with github
      </a>
    </button>
  );
};

export default GithubLogin;
