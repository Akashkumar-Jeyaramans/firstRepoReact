import {
  ApartmentOutlined,
  CaretDownOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
} from "@ant-design/icons/lib/icons";
import { Card, Spin, Tree } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getSitesById } from "../../features/Dashboard/dashboardDeviceSlice";

const { TreeNode } = Tree;

const DeviceSiteTree = (props) => {
  const { sitesData, loadingData } = props;
  const dispatch = useDispatch();
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
    dispatch(getSitesById(selectedKeys[0]));
  };

  const renderTreeNodes = (dataSource) => {
    return dataSource.map((menu, index) => {
      if (menu.children) {
        return (
          <TreeNode
            key={menu.key}
            title={menu.title}
            icon={
              menu.title === "global" ? (
                <GlobalOutlined />
              ) : (
                <EnvironmentOutlined />
              )
            }
            selectable={false}
          >
            {renderTreeNodes(menu.children)}
          </TreeNode>
        );
      } else if (menu.sites) {
        return (
          <TreeNode
            key={menu.key}
            title={menu.title}
            icon={
              menu.title === "global" ? (
                <GlobalOutlined />
              ) : (
                <EnvironmentOutlined />
              )
            }
            selectable={false}
          >
            {menu.sites.map((site, index) => (
              <TreeNode
                key={site._id}
                title={site.name}
                icon={<ApartmentOutlined />}
              />
            ))}
          </TreeNode>
        );
      } else return null;
    });
  };
  return (
    <Card style={{ height: "100%" }}>
      {loadingData ? (
        <Spin />
      ) : (
        <Tree
          style={{ width: "100%", textTransform: "capitalize" }}
          showIcon
          showLine={{ showLeafIcon: false }}
          switcherIcon={<CaretDownOutlined />}
          defaultExpandAll
          onSelect={onSelect}
        >
          {renderTreeNodes(sitesData)}
        </Tree>
      )}
    </Card>
  );
};

export default DeviceSiteTree;
