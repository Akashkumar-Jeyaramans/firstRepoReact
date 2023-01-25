import { Button, notification, Popconfirm, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../../components/userManagement/UserForm";
import moment from "moment";
import {
  clearData,
  getAllUsers,
  requestDeleteSelectedUsers,
  requestDeleteUsers,
  requestFilterUsers,
  requestSearchUsers,
  requestSetUser,
  requestUpdateUsers,
  userManagementSelector,
} from "../../features/Management/UserManagementSlice";
import { isUndefined } from "../../utils/Comman/isUndefined";
import CustomFilterTable from "../../utils/Comman/CustomFilterTable/CustomFilterTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { userAuthSelector } from "../../features/useAuthSlice";

const initialValues = {
  id: "",
  displayName: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  enable: true,
};

const filterColumn = [
  { key: "displayName", label: "Display Name" },
  { key: "email", label: "Email" },
  { key: "name", label: "Username" },
];

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { users, loadingUserList, total } = useSelector(userManagementSelector);
  const { name, role } = useSelector(userAuthSelector);
  useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch(clearData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [visible, setVisible] = useState(false);
  const [initialValue, setInitialValue] = useState(initialValues);

  const column = [
    {
      title: "Display Name",
      dataIndex: "displayName",
      key: "displayName",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.displayName > b.displayName ? 1 : -1),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.email > b.email ? 1 : -1),
    },
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Created At",
      dataIndex: "createAt",
      key: "createAt",
      render: (text, record, index) => {
        return isUndefined(text, moment(new Date(text)).format("DD-MMM-YYYY"));
      },
      sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.role > b.role ? 1 : -1),
    },
    {
      title: "Active",
      dataIndex: "enable",
      key: "enable",
      render: (text) => isUndefined(text, text).toString(),
      sorter: (a, b) => (a.enable > b.enable ? 1 : -1),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.name !== "admin" && role === "admin" && (
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          )}

          {record.name === name ||
            (record.name !== "admin" && role === "admin" && (
              <Popconfirm
                placement="top"
                title="Are you sure to delete this user?"
                onConfirm={() => onDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            ))}
        </Space>
      ),
    },
  ];

  const onCreate = (values) => {
    if (initialValue.id === "") {
      dispatch(requestSetUser(values))
        .unwrap()
        .then((result) => {
          notification.success({ message: "User Created!" });
        })
        .catch((error) => {
          notification.error({ message: "Somthing went wrong!" });
        });
    } else {
      console.log("edit value", { ...values, id: initialValue.id });
      dispatch(requestUpdateUsers({ ...values, id: initialValue.id }))
        .unwrap()
        .then((result) => {
          notification.success({ message: "User updated!" });
        })
        .catch((error) => {
          notification.error({ message: "Somthing went wrong!" });
        });
    }
    setVisible(false);
    setInitialValue(initialValues);
  };
  const onEdit = (values) => {
    setInitialValue({
      id: values._id,
      displayName: values.displayName,
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.password,
      role: values.role,
      enable: values.enable,
    });
    setVisible(true);
  };
  const onDelete = (values) => {
    dispatch(requestDeleteUsers({ id: values._id }))
      .unwrap()
      .then((result) => {
        notification.success({ message: "User deleted!" });
      })
      .catch((error) => {
        notification.error({ message: "Somthing went wrong!" });
      });
  };
  const handleFormVisible = () => {
    setVisible(true);
  };

  const handleOnReloadClick = () => {
    dispatch(getAllUsers());
  };

  const handleOndeleteSelected = (selectedRowKeys) => {
    dispatch(requestDeleteSelectedUsers(selectedRowKeys))
      .unwrap()
      .then((result) => {
        notification.success({ message: `${result.count} User deleted!` });
      })
      .catch((error) => {
        notification.error({ message: "Somthing went wrong!" });
      });
  };

  const handleOnSearchClick = (key) => {
    console.log(key);
    key !== "" ? dispatch(requestSearchUsers(key)) : dispatch(getAllUsers());
  };
  const handlefilterSearchClick = (value) => {
    console.log(value);
    dispatch(requestFilterUsers(value));
  };
  const handlefilterResetClick = () => {
    console.log("reset clicked !");
  };

  return (
    <>
      <CustomFilterTable
        dataSource={users}
        column={column}
        totalRows={total}
        loading={loadingUserList}
        rowKey="_id"
        title="Registered Users"
        role={role}
        buttonToolbar={true}
        filterToolbar={true}
        onAddButtonClick={handleFormVisible}
        onReloadClick={handleOnReloadClick}
        onDeleteSelectedClick={handleOndeleteSelected}
        onSearchClick={handleOnSearchClick}
        onFilterSearchClick={handlefilterSearchClick}
        onFilterResetClick={handlefilterResetClick}
        filterColumn={filterColumn}
      />
      <UserForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
          setTimeout(() => {
            setInitialValue(initialValues);
          }, 100);
        }}
        initialValue={initialValue}
      />
    </>
  );
};

export default UserManagementPage;
