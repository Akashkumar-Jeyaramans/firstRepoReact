import { configureStore } from "@reduxjs/toolkit";
import { UserManagementSlice } from "../features/Management/UserManagementSlice";
import { userAuthSlice } from "../features/useAuthSlice";
import { treeSlice } from "../features/treeSlice";
import { currentUserSlice } from "../features/UserAccount/UserprofileSlice";
import { SiteManagmentSlice } from "../features/Management/SiteManagmentSlice";
import { dashboardDeviceSlice } from "../features/Dashboard/dashboardDeviceSlice";

export const store = configureStore({
  reducer: {
    deviceDashboard: dashboardDeviceSlice.reducer,
    userAuth: userAuthSlice.reducer,
    sitesTree: treeSlice.reducer,
    userManagement: UserManagementSlice.reducer,
    userProfile: currentUserSlice.reducer,
    SiteTable: SiteManagmentSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
