import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

import "./SignUpPage.css";

export const REGISTER_USER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      success
      message
    }
  }
`;

const SignUpPage = ({ history }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [EmailStatus, setEmailStatus] = useState("");
  const [PasswordStatus, setPasswordStatus] = useState("");
  const [Username, setUsername] = useState("");
  const [UsernameStatus, setUsernameStatus] = useState("");
  const [Status, setStatus] = useState("");
  const [register, { data }] = useMutation(REGISTER_USER);

  const validPassword = (password) => {
    return /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])/.test(password);
  };

  const isEmail = (email) => {
    if (typeof email !== "string") {
      return false;
    }

    if (email.match(/[\w\d]+@[\w\d]+\.{1}\w/)) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isEmail(Email) || !validPassword(Password) || !Username) {
      return;
    }

    register({
      variables: { email: Email, username: Username, password: Password },
    });
  };

  useEffect(() => {
    if (data?.register) {
      if (data.register.success) {
        alert("Successfully registered.");
        history.push("/");
      } else {
        setStatus(data.register.message || "");
      }
    }
  }, [data, history]);

  const emailChangeHandler = (event) => {
    setEmail(event.currentTarget.value);
    if (isEmail(event.currentTarget.value)) {
      setEmailStatus("");
    } else {
      setEmailStatus("Invalid email type");
    }
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.currentTarget.value);
    if (validPassword(event.currentTarget.value)) {
      setPasswordStatus("");
    } else {
      setPasswordStatus(
        "Password must include at least 1 of a-z, 1 of A-Z, and 1 of 0-9"
      );
    }
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.currentTarget.value);
    if (!event.currentTarget.value) {
      setUsernameStatus("Username is required");
    } else {
      setUsernameStatus("");
    }
  };

  return (
    <main>
      <h1 style={{ margin: "2rem" }}>Sign Up</h1>
      <form onSubmit={submitHandler} className="signup-form">
        <div>
          <label>Username :</label>
          <input
            type="text"
            onChange={usernameChangeHandler}
            required
            placeholder="Username"
            maxLength={50}
            value={Username}
          />
        </div>
        <span className="status">{UsernameStatus}</span>
        <div>
          <label>Email :</label>
          <input
            type="email"
            onChange={emailChangeHandler}
            required
            placeholder="Email"
            maxLength={40}
            value={Email}
          />
        </div>
        <span className="status">{EmailStatus}</span>
        <div>
          <label>Password :</label>
          <input
            type="password"
            onChange={passwordChangeHandler}
            required
            placeholder="Password"
            minLength={5}
            maxLength={20}
            value={Password}
          />
        </div>
        <span className="status">{PasswordStatus}</span>
        <span className="status">{Status}</span>
        <button type="submit">submit</button>
      </form>
    </main>
  );
};

export default SignUpPage;
