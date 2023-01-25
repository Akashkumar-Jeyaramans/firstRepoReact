import { Button, Col, Input, Popconfirm, Row, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import React from "react";
import TableFilter from "./TableFilter";

const { Search } = Input;

const TableToolbar = (props) => {
  const {
    onAddButtonClick,
    selectedRowKeys,
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

  const onSearch = (value) => onSearchClick(value);
  const handlefilterSearchClick = (value) => {
    onFilterSearchClick(value);
  };
  const handlefilterResetClick = () => {
    onFilterResetClick();
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <Row gutter={[8, 8]}>
      <Col span={24} style={{ textAlign: "end" }}>
        {filterToolbar && (
          <Space>
            {filterColumn?.map((fColumn) => {
              return (
                <TableFilter
                  key={fColumn.key}
                  name={fColumn.key}
                  label={fColumn.label}
                  onSearchClick={handlefilterSearchClick}
                  onResetClick={handlefilterResetClick}
                />
              );
            })}

            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 300 }}
            />
          </Space>
        )}
      </Col>
      <Col span={24} style={{ textAlign: "end" }}>
        <Space>
          <Tooltip title="Reload">
            <Button
              type="text"
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={onReloadClick}
            />
          </Tooltip>
          {buttonToolbar && role === "admin" && (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onAddButtonClick}
              >
                Add New
              </Button>
              <Popconfirm
                placement="top"
                title="Are you sure to delete selected"
                onConfirm={onDeleteSelectedClick}
                okText="Yes"
                cancelText="No"
                disabled={!hasSelected}
              >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={!hasSelected}
                >
                  Delete Selected
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default TableToolbar;
