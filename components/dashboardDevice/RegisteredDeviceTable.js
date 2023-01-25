import { ReloadOutlined } from "@ant-design/icons/lib/icons";
import { Button, Card, Table, Tooltip } from "antd";
import React from "react";

const RegisteredDeviceTable = () => {
  const dataSource = [
    {
      _id: "1",
      name: "cwr-001",
      type: "cwr",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "cwr-1.0.0.1.fw",
      status: "online",
    },
    {
      _id: "2",
      name: "cwr-002",
      type: "cwr",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "cwr-1.0.0.2.fw",
      status: "online",
    },
    {
      _id: "3",
      name: "cwr-003",
      type: "cwr",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "cwr-1.0.0.3.fw",
      status: "online",
    },
    {
      _id: "4",
      name: "switch-001",
      type: "switch",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "switch-1.0.0.1.fw",
      status: "online",
    },
    {
      _id: "5",
      name: "switch-002",
      type: "switch",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "switch-1.0.0.2.fw",
      status: "online",
    },
    {
      _id: "6",
      name: "mdr-001",
      type: "MDR",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "mdr-1.0.0.1.fw",
      status: "online",
    },
    {
      _id: "7",
      name: "mdr-002",
      type: "MDR",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "mdr-1.0.0.2.fw",
      status: "online",
    },
    {
      _id: "8",
      name: "mdr-003",
      type: "MDR",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "mdr-1.0.0.3.fw",
      status: "online",
    },
    {
      _id: "9",
      name: "mdr-004",
      type: "MDR",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "mdr-1.0.0.4.fw",
      status: "online",
    },
    {
      _id: "10",
      name: "mdr-005",
      type: "MDR",
      location: "global/asia/India/bangore/Atop 12",
      sfVersion: "mdr-1.0.0.5.fw",
      status: "online",
    },
  ];
  const columns = [
    {
      title: "Device Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => (a.type > b.type ? 1 : -1),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => (a.location > b.location ? 1 : -1),
    },
    {
      title: "Softwar Version",
      dataIndex: "sfVersion",
      key: "sfVersion",
      sorter: (a, b) => (a.sfVersion > b.sfVersion ? 1 : -1),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <Card
      title="Registered Devices"
      extra={
        <Tooltip title="Reload">
          <Button type="text" shape="circle" icon={<ReloadOutlined />} />
        </Tooltip>
      }
      bodyStyle={{ paddingTop: 0, paddingBottom: 0, minHeight: 580 }}
      headStyle={{ borderBottom: "none" }}
      bordered={false}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="_id"
        pagination={{
          showQuickJumper: true,
          size: "default",
          pageSizeOptions: [10, 15, 20, 25],
        }}
      ></Table>
    </Card>
  );
};

export default RegisteredDeviceTable;
