import { Col, Row  } from 'antd';

import React from "react";

import EditSite from '../../components/siteManagement/EditSite'
import MapOverview from '../../components/overview/MapOverview';

const EditSiteManagePage = () => {
  return (
    <div >
      <Row>
      <Col span={24}>
      <MapOverview/>
      </Col>
      <Col span={24}>
      <EditSite />
      </Col>
      </Row>
    </div>
  );
};

export default EditSiteManagePage;