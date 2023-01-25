import { Col, Row  } from 'antd';

import React from "react";

import AddSite from '../../components/siteManagement/AddSite'
import MapOverview from '../../components/overview/MapOverview';

const AddSiteManagePage = () => {
  return (
    <div >
      <Row>
      <Col span={24}>
      <MapOverview/>
      </Col>
      <Col span={24}>
      <AddSite/>
      </Col>
      </Row>
    </div>
  );
};

export default AddSiteManagePage;