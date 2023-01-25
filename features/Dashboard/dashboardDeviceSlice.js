import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProtectedApis from "../../utils/apis/ProtectedApis";

export const getSitesTreeData = createAsyncThunk(
  "dashboardDevice/getSitesTreeData",
  async (_, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("/sites/tree");
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        return data.payload;
      } else {
        return thunkAPI.rejectWithValue(data.payload.reason);
      }
    } catch (e) {
      console.log("Error", e.response.statusText);
      if (e.response) return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getSitesById = createAsyncThunk(
  "dashboardDevice/getSitesById",
  async (param, thunkAPI) => {
    try {
      const response = await ProtectedApis.get(`/sites/${param}`);
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        return data.payload;
      } else {
        return thunkAPI.rejectWithValue(data.payload.reason);
      }
    } catch (e) {
      console.log("Error", e.response.statusText);
      if (e.response) return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const dashboardDeviceSlice = createSlice({
  name: "dashboardDevice",
  initialState: {
    sitesTreeData: [],
    loadingSitesTreeData: false,
    siteName: "",
    siteHierarchy: "Select site",
    siteLng: 0.0,
    siteLat: 0.0,
  },
  reducers: {
    clearData: (state) => {
      state.sitesTreeData = [];
      state.loadingSitesTreeData = false;
      state.siteName = "";
      state.siteHierarchy = "Select site";
      state.siteLng = 0.0;
      state.siteLat = 0.0;
    },
  },
  extraReducers: {
    [getSitesTreeData.fulfilled]: (state, { payload }) => {
      state.sitesTreeData = payload.data;
      state.loadingSitesTreeData = false;
    },
    [getSitesTreeData.pending]: (state, { payload }) => {
      state.sitesTreeData = [];
      state.loadingSitesTreeData = true;
    },
    [getSitesTreeData.rejected]: (state, { payload }) => {
      state.sitesTreeData = [];
      state.loadingSitesTreeData = false;
    },
    [getSitesById.fulfilled]: (state, { payload }) => {
      state.siteName = payload.name;
      state.siteHierarchy = payload.hierarchy;
      state.siteLat = payload.latutude ? payload.latutude : 0.0;
      state.siteLng = payload.longitude ? payload.longitude : 0.0;
    },
  },
});

export const { clearData } = dashboardDeviceSlice.actions;
export const deviceDashboardSelector = (state) => state.deviceDashboard;
