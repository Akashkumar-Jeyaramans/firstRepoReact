import { GlobalOutlined, TableOutlined } from "@ant-design/icons/lib/icons";
import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeviceSiteMap from "../../components/dashboardDevice/DeviceSiteMap";
import DeviceSiteTree from "../../components/dashboardDevice/DeviceSiteTree";
import RegisterdDeviceChart from "../../components/dashboardDevice/RegisterdDeviceChart";
import RegisteredDeviceTable from "../../components/dashboardDevice/RegisteredDeviceTable";
import {
  clearData,
  deviceDashboardSelector,
  getSitesTreeData,
} from "../../features/Dashboard/dashboardDeviceSlice";

const DevicePage = () => {
  const dispatch = useDispatch();
  const {
    sitesTreeData,
    loadingSitesTreeData,
    siteName,
    siteHierarchy,
    siteLng,
    siteLat,
  } = useSelector(deviceDashboardSelector);
  const [viewChange, setViewChange] = useState("map");

  useEffect(() => {
    dispatch(getSitesTreeData());
    return () => {
      dispatch(clearData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row gutter={[8, 8]}>
      <Col span={7}>
        <DeviceSiteTree
          sitesData={sitesTreeData}
          loadingData={loadingSitesTreeData}
        />
      </Col>
      <Col span={17}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              title={`Site: ${siteHierarchy}/${siteName}`}
              extra={
                <>
                  <Button
                    type="default"
                    icon={<GlobalOutlined />}
                    style={{ borderRadius: 0 }}
                    onClick={() => setViewChange("map")}
                  />
                  <Button
                    type="default"
                    icon={<TableOutlined />}
                    style={{ borderRadius: 0 }}
                    onClick={() => setViewChange("table")}
                  />
                </>
              }
              bodyStyle={{ padding: 0, minHeight: 645 }}
              headStyle={{ borderBottom: "none" }}
            >
              {viewChange === "map" ? (
                <DeviceSiteMap siteLng={siteLng} siteLat={siteLat} />
              ) : (
                <RegisteredDeviceTable />
              )}
            </Card>
          </Col>
          <Col span={24}>
            <RegisterdDeviceChart siteName={siteName} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DevicePage;
