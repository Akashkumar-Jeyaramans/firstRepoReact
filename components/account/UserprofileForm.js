import React from "react";
import { Form, Input, Button, Row } from "antd";

export default function UserForm(props) {
  const {
    role,
    userDisplayname,
    useremail,
    displaynameHandler,
    emailHandler,
    onSave,
  } = props;

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 25,
    },
  };

  return (
    <Row>
      <Form
        className="form-label"
        {...layout}
        layout="vartical"
        labelAlign="left"
        autoComplete="off"
      >
        <Form.Item label="Display Name">
          <Input
            value={userDisplayname}
            onChange={(e) => displaynameHandler(e)}
          />
        </Form.Item>

        <Form.Item label="Role">
          <Input value={role} disabled />
        </Form.Item>

        <Form.Item label="Email">
          <Input value={useremail} onChange={(e) => emailHandler(e)} />
        </Form.Item>

        <Row justify="end" gutter={500}>
          <Form.Item>
            <Button block type="primary" onClick={onSave}>
              Save Changes
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Row>
  );
}
