import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Checkbox } from "antd";

const UserForm = (props) => {
  const { visible, onCreate, onCancel, initialValue } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValue);
    return () => {
      form.resetFields();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);
  return (
    <Modal
      visible={visible}
      forceRender
      maskClosable={false}
      title={
        initialValue.id === "" ? "Create a new user" : "Edit an existing user"
      }
      okText={initialValue.id === "" ? "Create User" : "Update User"}
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="displayName"
          label="Display Name"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input the email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {initialValue.id === "" && (
          <Form.Item
            name="name"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input the username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {initialValue.id === "" && (
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input the password!",
              },
              {
                pattern:
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
                message:
                  "Must contain at least one number, one uppercase and lowercase letter, one special character & at least 8 or more characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}
        {initialValue.id === "" && (
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please input the confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: "Please select the confirm role!",
            },
          ]}
        >
          <Select>
            <Select.Option value="">None</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="supervisor">Supervisor</Select.Option>
            <Select.Option value="operator">Operator</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="enable" valuePropName="checked">
          <Checkbox>Enabled</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
