import React, { useState } from "react";
import { Modal, Button } from "antd";
import { withRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { USER_FRAGMENT } from "../hoc/auth";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`;

const LoginButton = ({ history }) => {
  const client = useApolloClient();

  const [Visible, setVisible] = useState(false);
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    // Next, we want to pass an onCompleted callback to useMutation
    // that will be called once the mutation is complete with its return value.
    onCompleted(data) {
      console.log("data:", data);
      localStorage.setItem("token", data.token);
      client.cache.modify({
        fields: {
          isLoggedIn() {
            return true;
          },
        },
      });
    },
  });

  const showModal = () => {
    setVisible(true);
  };

  const onClickSignUp = () => {
    history.push("/signup");
  };

  const refreshFunction = ({ email, password }) => {
    login(email, password);
  };

  return (
    <div>
      <button className="pure-button" onClick={showModal}>
        Login
      </button>
      <Modal title="Login" visible={Visible}>
        <LoginForm refreshFunction={refreshFunction} />
      </Modal>
    </div>
  );
};

export default withRouter(LoginButton);
