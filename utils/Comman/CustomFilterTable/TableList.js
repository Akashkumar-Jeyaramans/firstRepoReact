import React from "react";
import { Table } from "antd";

const TableList = (props) => {
  const { dataSource, column, total, onSelectedRowKeys, loading, rowKey } =
    props;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div className="userList">
      <Table
        dataSource={dataSource}
        columns={column}
        rowKey={rowKey}
        pagination={{
          showQuickJumper: true,
          size: "default",
          total: total,
          pageSizeOptions: [10, 15, 20, 25],
        }}
        loading={loading}
        rowSelection={rowSelection}
      ></Table>
    </div>
  );
};

export default TableList;
