import {
  GlobalOutlined,
  EnvironmentOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { retrieveTree } from "../../../features/treeSlice";

import TreeList from "./TreeList";

const TreeConditon = () => {
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const dispatch = useDispatch();
  let replaceKeyName;
  let treeComponent;

  if (treeData !== undefined) {
    replaceKeyName = JSON.parse(
      JSON.stringify(treeData).split('"name":').join('"title":')
    );

    treeComponent = replaceKeyName.map(function (item, index) {
      ///get Global
      if (item.key === "") {
        item.key = index;
        for (var i = 0; i < item.children.length; i++) {
          const getGlobal = item;
          if (item.sites === null) {
            getGlobal.icon = <GlobalOutlined />;
          }
        }
      }

      //get Children
      for (var i = 0; i < item.children.length; i++) {
        const getChildren01 = item.children[i];

        if (getChildren01.sites === null) {
          getChildren01.icon = <EnvironmentOutlined />;
        }
        if (getChildren01.children === null) {
          getChildren01.icon = <EnvironmentOutlined />;
        }

        //get Site
        if (getChildren01.children === null) {
          const ConvertSites = (getChildren01.children = getChildren01.sites);
          for (var o = 0; i < ConvertSites.length; o++) {
            const getIconSite = ConvertSites[o];
            getIconSite.icon = <ApartmentOutlined />;
          }
        }
        if (item.children[i].key === "") {
          item.children[i].key = "0" + index++;
        }

        const getChildren001 = item.children;

        //get Children
        for (var j = 0; j < getChildren001.length; j++) {
          const getChildren000 = getChildren001[j].children;
          if (getChildren000 != null) {
            for (var k = 0; k < getChildren000.length; k++) {
              const getChildren001 = getChildren000[k];
              if (getChildren001.sites === null) {
                getChildren001.icon = <EnvironmentOutlined />;

                //get Children
                if (getChildren001.key != null) {
                  for (var l = 0; l < getChildren001.children.length; l++) {
                    const getChildren0000 = getChildren001.children[l];
                    if (getChildren0000.children === null) {
                      getChildren0000.icon = <EnvironmentOutlined />;
                    }
                    if (getChildren0000.key === "") {
                      getChildren0000.key = "0000" + index++;
                    }
                    //get Site
                    if (getChildren0000.children === null) {
                      const getChildren0001 = (getChildren0000.children =
                        getChildren0000.sites);
                      for (var m = 0; m < getChildren0001.length; m++) {
                        const getIcon0001 = getChildren0001[m];
                        getIcon0001.icon = <ApartmentOutlined />;
                      }
                    }
                  }
                }
              }
              if (getChildren001.key === "") {
                getChildren001.key = "00" + index++;
              }
            }
          }
        }
      }
      return item;
    });
  }

  useEffect(() => {
    dispatch(retrieveTree()).then((data) => {
      setTreeData(data.payload);
      setExpandedKeys(["00"]);
    });
  }, []);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };

  return (
    <div className="myDemo">
      <TreeList
        data={treeComponent}
        expand={expandedKeys}
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
      />
    </div>
  );
};

export default TreeConditon;
