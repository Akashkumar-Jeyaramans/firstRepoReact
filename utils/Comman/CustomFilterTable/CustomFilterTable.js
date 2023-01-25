import { Card, Col, Row } from "antd";
import React, { useState } from "react";
import TableList from "./TableList";
import TableToolbar from "./TableToolbar";

const CustomFilterTable = (props) => {
  const {
    dataSource,
    column,
    totalRows,
    loading,
    rowKey,
    title,
    onAddButtonClick,
    onReloadClick,
    onDeleteSelectedClick,
    onSearchClick,
    onFilterSearchClick,
    onFilterResetClick,
    filterColumn,
    filterToolbar,
    buttonToolbar,
    role,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const updateSelectedRowKeys = (keysValue) => {
    setSelectedRowKeys(keysValue);
  };
  const handleDeleteSelected = () => {
    onDeleteSelectedClick(selectedRowKeys);
    setSelectedRowKeys([]);
  };
  return (
    <Card title={title}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TableToolbar
            onAddButtonClick={onAddButtonClick}
            selectedRowKeys={selectedRowKeys}
            onReloadClick={onReloadClick}
            filterToolbar={filterToolbar}
            buttonToolbar={buttonToolbar}
            onDeleteSelectedClick={handleDeleteSelected}
            onSearchClick={onSearchClick}
            onFilterSearchClick={onFilterSearchClick}
            onFilterResetClick={onFilterResetClick}
            filterColumn={filterColumn}
            role={role}
          />
        </Col>
        <Col span={24}>
          <TableList
            dataSource={dataSource}
            column={column}
            total={totalRows}
            onSelectedRowKeys={updateSelectedRowKeys}
            loading={loading}
            rowKey={rowKey}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CustomFilterTable;
