import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useMutation, useApolloClient, gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
    }
  }
`;

const LoginButton = ({ history }) => {
  const client = useApolloClient();
  const [Status, setStatus] = useState("");
  const [Visible, setVisible] = useState(false);
  const [login, { data }] = useMutation(LOGIN_USER, {
    onCompleted(result) {
      if (result.login) {
        if (result.login.success) {
          client.cache.modify({
            fields: {
              isLoggedIn() {
                return true;
              },
            },
          });
        } else {
          setStatus(result.login.message);
        }
      }
    },
  });

  const showModal = () => setVisible(true);
  const onOKHandler = () => setVisible(false);
  const onCancleHandler = () => setVisible(false);

  useEffect(() => {
    if (data?.login?.success) {
      history.push("/");
    }
  }, [data, history]);

  return (
    <div>
      <button className="pure-button" onClick={showModal}>
        Login
      </button>
      <Modal
        title="Login"
        visible={Visible}
        onOk={onOKHandler}
        onCancel={onCancleHandler}
      >
        <LoginForm login={login} status={Status} />
      </Modal>
    </div>
  );
};

export default withRouter(LoginButton);
