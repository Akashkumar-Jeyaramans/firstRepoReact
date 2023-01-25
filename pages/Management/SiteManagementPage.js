import { Button, notification, Popconfirm, Space } from "antd";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../../features/Management/SiteManagmentSlice";
import { isUndefined } from "../../utils/Comman/isUndefined";
import CustomFilterTable from "../../utils/Comman/CustomFilterTable/CustomFilterTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  getAlldata,
  requestSearchdata,
  siteTableSelector,
  requestDeletedata,
  requestFilterdata,
  requestDeleteSelecteddata,
} from "../../features/Management/SiteManagmentSlice";
import { userAuthSelector } from "../../features/useAuthSlice";

const filterColumn = [
  { key: "name", label: "Building Name" },
  { key: "hierarchy", label: "Hierarchy" },
];

const SiteManagementPage = () => {
  const dispatch = useDispatch();
  const { sites, loadingSiteList, total } = useSelector(siteTableSelector);
  const { role } = useSelector(userAuthSelector);
  useEffect(() => {
    dispatch(getAlldata());
    return () => {
      dispatch(clearData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const column = [
    {
      title: "Building Name",
      dataIndex: "name",
      key: "name",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Hierarchy",
      dataIndex: "hierarchy",
      key: "hierarchy",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.hierarchy > b.hierarchy ? 1 : -1),
    },
    {
      title: "Latutude",
      dataIndex: "latutude",
      key: "latutude",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.latutude > b.latutude ? 1 : -1),
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.longitude > b.longitude ? 1 : -1),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => isUndefined(text, text),
      sorter: (a, b) => (a.type > b.type ? 1 : -1),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            
          />
          <Popconfirm
            placement="top"
            title="Are you sure to delete this site?"
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
        </Space>
      ),
    },
  ];
  const onEdit = (values) => {
        console.log(values._id); 
  };
  const onDelete = (values) => {
    dispatch(requestDeletedata({ id: values._id }))
      .unwrap()
      .then((result) => {
        notification.success({ message: "Site deleted!" });
      })
      .catch((error) => {
        notification.error({ message: "Somthing went wrong!" });
      });
  };
  
  const handleOnReloadClick = () => {
    dispatch(getAlldata());
  };

  const handleOndeleteSelected = (selectedRowKeys) => {
    dispatch(requestDeleteSelecteddata(selectedRowKeys))
      .unwrap()
      .then((result) => {
        notification.success({ message: `${result.count} Site deleted!` });
      })
      .catch((error) => {
        notification.error({ message: "Somthing went wrong!" });
      });
  };

  const handleOnSearchClick = (key) => {
    key !== "" ? dispatch(requestSearchdata(key)) : dispatch(getAlldata());
  };
  const handlefilterSearchClick = (value) => {
    dispatch(requestFilterdata(value));
  };
  const handlefilterResetClick = () => {
    console.log("reset clicked !");
  };

  return (
    <>
      <CustomFilterTable
        dataSource={sites}
        column={column}
        totalRows={total}
        loading={loadingSiteList}
        rowKey="_id"
        title="Registered Site"
        role={role}
        buttonToolbar={true}
        filterToolbar={true}
        onReloadClick={handleOnReloadClick}
        onDeleteSelectedClick={handleOndeleteSelected}
        onSearchClick={handleOnSearchClick}
        onFilterSearchClick={handlefilterSearchClick}
        onFilterResetClick={handlefilterResetClick}
        filterColumn={filterColumn}
      />
    </>
  );
};

export default SiteManagementPage;
