import React, { useState, useEffect } from "react";
import { Card, Col, Row, message, notification } from "antd";
import { useDispatch } from "react-redux";
import UserprofileForm from "../../components/account/UserprofileForm";
import UserprofileImage from "../../components/account/UserprofileImage";
import {
  currentUser,
  updateUser,
} from "../../features/UserAccount/UserprofileSlice";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../features/UserAccount/UserprofileSlice";
import { clearData } from "../../features/Management/UserManagementSlice";

export default function UserProfilePage() {
  const { role, displayName, email, avatar, id } =
    useSelector(currentUserSelector);
  const dispatch = useDispatch();

  const [userDisplayname, setUserDisplayname] = useState("");
  const [useremail, setUseremail] = useState("");
  const [newavatar, setNewavatar] = useState("");

  const displaynameHandler = (e) => {
    setUserDisplayname(e.target.value);
  };

  const emailHandler = (e) => {
    setUseremail(e.target.value);
  };

  const onSave = () => {
    dispatch(
      updateUser({
        id,
        displayName: userDisplayname,
        email: useremail,
        avatar: newavatar,
      })
    )
      .unwrap()
      .then((result) => {
        notification.success({ message: "User updated!" });
      })
      .catch((error) => {
        notification.error({ message: "Somthing went wrong!" });
      });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2kb = file.size / 15000 <= 1;
    if (!isLt2kb) {
      message.error("Image must smaller than 15kb !");
    }
    return isJpgOrPng && isLt2kb;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (newavatar) =>
        setNewavatar(newavatar)
      );
      message.success("uploaded!");
    }
  };

  useEffect(() => {
    setUserDisplayname(displayName);
    setUseremail(email);
    setNewavatar(avatar);
  }, [displayName, email, avatar]);

  useEffect(() => {
    dispatch(currentUser());
    return () => {
      dispatch(clearData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <Row align="middle">
        <Col span={6}>
          <UserprofileImage
            displayName={displayName}
            newavatar={newavatar}
            beforeUpload={beforeUpload}
            handleChange={handleChange}
          />
        </Col>
        <Col span={18} push={3}>
          <UserprofileForm
            role={role}
            useremail={useremail}
            userDisplayname={userDisplayname}
            emailHandler={emailHandler}
            displaynameHandler={displaynameHandler}
            onSave={onSave}
          />
        </Col>
      </Row>
    </Card>
  );
}
