import { Col, Row } from "antd";
import React from "react";
import AlarmStatus from "../../components/overview/AlarmStatus";
import DeviceStatus from "../../components/overview/DeviceStatus";
import MapOverview from "../../components/overview/MapOverview";

const Overview = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <DeviceStatus />
      </Col>
      <Col span={12}>
        <AlarmStatus />
      </Col>
      <Col span={24}>
        <MapOverview />
      </Col>
    </Row>
  );
};

export default Overview;
