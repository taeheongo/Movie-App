import React from "react";
import "./LoginForm.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "./LoginForm.css";

const LoginForm = ({ refreshFunction }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onSuccess = (response) => console.log("response: ", response);
  const onFailure = (response) => console.error("error: ", response);

  const onClick = () => {};

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={[{ required: true }, { type: "email" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="email"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/">register now!</a>
        </Form.Item>
      </Form>
      <button onClick={onClick}>
        <a href="https://github.com/login/oauth/authorize?client_id=7da9097be48a84356d99">
          login with github
        </a>
      </button>
    </div>
  );
};

export default withRouter(LoginForm);
