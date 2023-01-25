import React from "react";
import { Avatar, Button, Row, Upload } from "antd";

export default function ProfileForm(props) {
  const { displayName, newavatar, beforeUpload, handleChange } = props;

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <>
      <Row justify="center">
        <h2>Greetings, {displayName} </h2>
      </Row>

      <Row justify="center">
        <Avatar src={newavatar} style={{ height: "210px", width: "208px" }} />
      </Row>

      <Row style={{ justifyContent: "center" }}>
        <Upload
          name="file"
          showUploadList={false}
          customRequest={dummyRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <Button block type="primary">
            Change Profile Picture
          </Button>
        </Upload>
      </Row>
    </>
  );
}
