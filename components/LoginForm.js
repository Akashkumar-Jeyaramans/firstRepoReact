import React from "react";
import { Form, Typography, Input, Checkbox, Button, Image, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const { Text } = Typography;

const LoginForm = (props) => {
  return (
    <div className="formWrapper">
      <Space direction="vertical" align="center" size={0}>
        <Image height={87} src={logo} preview={false} />
        <Text type="secondary">Simple Solutions for Complex Connections</Text>
      </Space>
      <Form
        name="normal_login"
        className="loginForm"
        size="large"
        autoComplete="off"
        onFinish={props.onFinish}
        form={props.form}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/login">
            Forgot your password?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={props.loading}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
