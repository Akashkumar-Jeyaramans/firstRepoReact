import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Avatar, Menu, Button, Dropdown, notification } from "antd";
import React, { useState } from "react";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import RouteMenu from "../utils/routes/RouteMenu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, userAuthSelector } from "../features/useAuthSlice";

const MainLayout = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector(userAuthSelector);
  const [pathname, setPathname] = useState(location.pathname);
  const handleLogout = () => {
    navigate("/login", { replace: true });
    dispatch(logoutUser());
    notification.info({
      message: "Logout",
      description: "Successfully loggedout !",
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="primary" block onClick={() => handleLogout()}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <ProLayout
      layout="mix"
      title="Atop OKRA"
      logo={logo}
      fixSiderbar
      fixedHeader
      location={{ pathname }}
      route={{
        routes: RouteMenu,
      }}
      navTheme="light"
      rightContentRender={(props) => (
        <div>
          <Badge count={11} size="small" offset={[-1, 3]}>
            <Avatar
              shape="circle"
              icon={<BellOutlined />}
              style={{ background: "inherit" }}
            />
          </Badge>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="text"
              onClick={(e) => e.preventDefault()}
              icon={<UserOutlined />}
              style={{ color: "#fff" }}
            >
              {name}
            </Button>
          </Dropdown>
        </div>
      )}
      menuItemRender={(item, dom) => {
        return (
          <Link
            to={item.path || "deploy"}
            onClick={() => setPathname(item.path || "deploy")}
          >
            {dom}
          </Link>
        );
      }}
    >
      <PageContainer
        header={{
          title: "",
          breadcrumb: {},
        }}
      >
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
};

export default MainLayout;
