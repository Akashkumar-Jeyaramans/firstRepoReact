import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Space } from "antd";
import React, { useState } from "react";

const TableFilter = (props) => {
  const { name, label, onSearchClick, onResetClick } = props;
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleReset = () => {
    onResetClick();
    setInputValue("");
    setVisible(false);
  };
  const handleSearch = () => {
    onSearchClick({ [name]: inputValue });
    setInputValue("");
    setVisible(false);
  };
  const content = (
    <div>
      <Input
        placeholder={`Search by ${label}`}
        style={{ marginBottom: 8, display: "block" }}
        onChange={handleChangeInput}
        value={inputValue}
      />
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
          onClick={handleSearch}
          disabled={inputValue === ""}
        >
          Search
        </Button>
        <Button
          size="small"
          style={{ width: 90 }}
          onClick={handleReset}
          disabled={inputValue === ""}
        >
          Reset
        </Button>
      </Space>
    </div>
  );
  return (
    <Popover
      content={content}
      placement="bottom"
      trigger="click"
      destroyTooltipOnHide
      visible={visible}
      onVisibleChange={() => setVisible((prev) => !prev)}
    >
      <Button>
        {label}
        <DownOutlined />
      </Button>
    </Popover>
  );
};

export default TableFilter;
