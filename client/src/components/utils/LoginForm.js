import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import GithubLogin from "./GithubLogin";
import "./LoginForm.css";

const LoginForm = ({ login, status }) => {
  const onFinishHandler = (values) => {
    const { email, password } = values;
    login({ variables: { email, password } });
  };

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinishHandler}
      >
        <Form.Item name="email" rules={[{ required: true }, { type: "email" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="email"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, min: 5 }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <GithubLogin clientId="7da9097be48a84356d99" />
      <div className="signup-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
      <span
        style={{
          display: "block",
          color: "red",
          fontSize: "0.8rem",
          width: "100%",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        {status}
      </span>
    </div>
  );
};

export default withRouter(LoginForm);
