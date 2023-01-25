import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import DevicePage from "../../pages/Management/DevicePage";
import DashboardSitePage from "../../pages/Dashboard/SitePage";
import UserProfilePage from "../../pages/Account/UserProfilePage";
import CWRPage from "../../pages/Dashboard/CWRPage";
import Overview from "../../pages/Dashboard/Overview";
import SwitchPage from "../../pages/Dashboard/SwitchPage";
import ZTPPage from "../../pages/Management/ZTPPage";
import LoginPage from "../../pages/LoginPage";
import PageNotFound from "../../pages/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import UserManagementPage from "../../pages/Management/UserManagementPage";
import PingTerminalPage from "../../pages/Tools/PingTerminalPage";
import FlorePlanPage from "../../pages/Tools/FlorePlanPage";
import SiteManagementPage from "../../pages/Management/SiteManagementPage";
import DashboardDevicePage from "../../pages/Dashboard/DevicePage";


const PageRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          }
        />
        <Route
          path="/switch"
          element={
            <PrivateRoute>
              <SwitchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cwr"
          element={
            <PrivateRoute>
              <CWRPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ztp"
          element={
            <PrivateRoute>
              <ZTPPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/site"
          element={
            <PrivateRoute>
              <DashboardSitePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/sitemanagement"
          element={
            <PrivateRoute>
              <SiteManagementPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/devicemanagement"
          element={
            <PrivateRoute>
              <DevicePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/devicemanagement"
          element={
            <PrivateRoute>
              <DevicePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/userprofilepage"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usermanagement"
          element={
            <PrivateRoute>
              <UserManagementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/terminalping"
          element={
            <PrivateRoute>
              <PingTerminalPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/floorplan"
          element={
            <PrivateRoute>
              <FlorePlanPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/devices"
          element={
            <PrivateRoute>
              <DashboardDevicePage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PageRoutes;
