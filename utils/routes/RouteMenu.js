import {
  DashboardOutlined,
  DeploymentUnitOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";

let RouteMenu = [
  {
    name: "Dashboard",
    icon: <DashboardOutlined />,
    path: "Dashboard",
    routes: [
      {
        path: "/",
        name: "Overview",
      },
      {
        path: "/switch",
        name: "Switch",
      },
      {
        path: "/cwr",
        name: "CWR",
      },
      {
        path: "/site",
        name: "Site",
      },
      {
        path: "/devices",
        name: "Devices",
      },
    ],
  },
  {
    name: "Management",
    icon: <DeploymentUnitOutlined />,
    path: "Management",
    routes: [
      {
        path: "/ztp",
        name: "ZTP",
      },
      {
        name: "Site Management",
        path: "/sitemanagement",
      },
      {
        path: "/devicemanagement",
        name: "Device Management",
      },
      {
        path: "/usermanagement",
        name: "User Management",
      },
    ],
  },
  {
    name: "Account",
    icon: <UserOutlined />,
    path: "Account",
    routes: [
      {
        path: "/userprofilepage",
        name: "User Profile Page",
      },
    ],
  },
  {
    name: "Tools",
    icon: <ToolOutlined />,
    path: "Tools",
    routes: [
      {
        path: "/terminalping",
        name: "Ping",
      },
      {
        path: "/floorplan",
        name: "Floor Plan",
      },
    ],
  },
];

export default RouteMenu;
