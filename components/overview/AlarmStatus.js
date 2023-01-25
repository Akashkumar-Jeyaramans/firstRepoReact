import { Card, Col, Row, Typography } from "antd";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import React from "react";

const { Title } = Typography;
const colStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "203px",
};
const iconStyle = (color) => {
  return { fontSize: "70px", color: `var(--ant-${color}-color)` };
};

const AlarmStatus = () => {
  return (
    <Card title="Alarm Status" bordered={false}>
      <Row gutter={16} align="middle">
        <Col span={8} style={colStyle}>
          <WarningOutlined style={iconStyle("warning")} />
          <Title level={4}>Warning</Title>
          <Title level={5}>5</Title>
        </Col>
        <Col span={8} style={colStyle}>
          <InfoCircleOutlined style={iconStyle("info")} />
          <Title level={4}>Information</Title>
          <Title level={5}>5</Title>
        </Col>
        <Col span={8} style={colStyle}>
          <CloseCircleOutlined style={iconStyle("error")} />
          <Title level={4}>Critical</Title>
          <Title level={5}>5</Title>
        </Col>
      </Row>
    </Card>
  );
};

export default AlarmStatus;
