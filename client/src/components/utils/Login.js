import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Link, withRouter } from "react-router-dom";

const Login = ({ history }) => {
  const [Visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onOk = () => {
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onClickSignUp = () => {
    history.push("/signup");
  };

  return (
    <div>
      <button className="pure-button" onClick={showModal}>
        Login
      </button>
      <Modal
        title="Login"
        visible={Visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        Don't have an account? <Button onClick={onClickSignUp}>Sign up</Button>
      </Modal>
    </div>
  );
};

export default withRouter(Login);
