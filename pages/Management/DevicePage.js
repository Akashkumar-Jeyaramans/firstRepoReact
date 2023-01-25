import { Col, Row } from "antd";
import React from "react";
import DeviceSite from "../../components/deviceManagement/Device";
import MapSite from "../../components/deviceManagement/MapDevice";
import TreeDevice from "../../components/deviceManagement/TreeDevice";

const DevicePage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <TreeDevice/>
      </Col>
      <Col span={18}>
        <Row gutter={[16,16]}>
        <Col span={24}>
        <MapSite/>
        </Col>
        <Col span={24}>
        <DeviceSite/>
        </Col>
        </Row>
      </Col>
    </Row>
  );
};


export default DevicePage;
