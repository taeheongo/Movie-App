import React, { useState, useRef } from "react";

const SignUpPage = ({ refreshFunction }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const statusElement = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Email || !Password) {
      statusElement.textContent = "All inputs are required";
      return;
    }

    if (!validPassword(Password)) {
      statusElement.textContent =
        "Password must include at least 1 of a-z, 1 of A-Z, and 1 of 0-9";
      return;
    }

    refreshFunction({
      email: Email,
      password: Password,
    });
  };

  const validPassword = (password) => {
    return /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])/.test(password);
  };

  const emailChangeHandler = (event) => {
    if (!event.curentTarget.value) {
      return;
    }
    setEmail(event.curentTarget.value);
  };

  const passwordChangeHandler = (event) => {
    if (!event.curentTarget.value) {
      return;
    }
    setPassword(event.curentTarget.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Email :</label>
        <input
          type="email"
          onChange={emailChangeHandler}
          required
          placeholder="Input email"
          maxLength={40}
          value={Email}
        />
      </div>
      <div>
        <label>Password :</label>
        <input
          type="password"
          onChange={passwordChangeHandler}
          required
          placeholder=""
          minLength={5}
          maxLength={20}
          value={Password}
        />
      </div>
      <span
        ref={statusElement}
        style={{ color: "red", fontSize: "1rem" }}
      ></span>
    </form>
  );
};

export default SignUpPage;
