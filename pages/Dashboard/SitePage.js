import { Col, Row } from "antd";
import React from "react";
import DeviceSite from "../../components/site/DeviceSite";
import ListOfSite from "../../components/site/ListOfSite";
import RegisterSite from "../../components/site/RegisterSite";
import TreeSite from "../../components/site/TreeSite";

const SitePage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <TreeSite/>
      </Col>
      <Col span={16}>
        <Row gutter={[16,16]}>
        <Col span={24}>
        <ListOfSite/>
        </Col>
        <Col span={24}>
        <RegisterSite/>
        </Col>
        <Col span={24}>
        <DeviceSite/>
        </Col>
        </Row>
      </Col>
    </Row>
  );
};


export default SitePage;
