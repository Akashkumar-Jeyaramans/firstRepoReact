import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProtectedApis from "../../utils/apis/ProtectedApis";

export const getAlldata = createAsyncThunk(
  "SiteTable/getAlldata",
  async (_, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("sites/all");
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
export const requestDeletedata = createAsyncThunk(
  "SiteTable/requestDeletedata",
  async (param, thunkAPI) => {
    try {
      const { id } = param;
      const response = await ProtectedApis.delete(`/sites/${id}`);
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        thunkAPI.dispatch(getAlldata());
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
export const requestDeleteSelecteddata = createAsyncThunk(
  "SiteTable/requestDeleteSelecteddata",
  async (param, thunkAPI) => {
    try {
      const response = await ProtectedApis.delete(`/sites/all`, {
        params: { ids: param },
      });
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        thunkAPI.dispatch(getAlldata());
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
export const requestSearchdata = createAsyncThunk(
  "SiteTable/requestSearchdata",
  async (param, thunkAPI) => {
    try {
      const response = await ProtectedApis.get(`/search/sites/${param}`);
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        return data.payload.result;
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
export const requestFilterdata = createAsyncThunk(
  "SiteTable/requestFilterdata",
  async (param, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("/sites/all", {
        params: { q: param },
      });
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

export const SiteManagmentSlice = createSlice({
  name: "SiteTable",
  initialState: {
    sites: [],
    total: 0,
    loadingSiteList: false,
  },
  reducers: {
    clearData: (state) => {
      state.sites = [];
      state.loadingSiteList = false;
    },
  },
  extraReducers: {
    [getAlldata.fulfilled]: (state, { payload }) => {
      state.sites = payload.data;
      state.total = payload.total;
      state.loadingSiteList = false;
    },
    [getAlldata.pending]: (state, { payload }) => {
      state.sites = [];
      state.total = 0;
      state.loadingSiteList = true;
    },
    [getAlldata.rejected]: (state, { payload }) => {
      state.sites = [];
      state.total = 0;
      state.loadingSiteList = false;
    },
    [requestSearchdata.fulfilled]: (state, { payload }) => {
      state.sites = payload;
      state.loadingSiteList = false;
    },
    [requestSearchdata.pending]: (state, { payload }) => {
      state.sites = [];
      state.loadingSiteList = true;
    },
    [requestSearchdata.rejected]: (state, { payload }) => {
      state.sites = [];
      state.loadingSiteList = false;
    },
    [requestFilterdata.fulfilled]: (state, { payload }) => {
      state.sites = payload.data;
      state.total = payload.total;
      state.loadingSiteList = false;
    },
    [requestFilterdata.pending]: (state, { payload }) => {
      state.sites = [];
      state.total = 0;
      state.loadingSiteList = true;
    },
    [requestFilterdata.rejected]: (state, { payload }) => {
      state.sites = [];
      state.total = 0;
      state.loadingSiteList = false;
    },
  },
});

export const { clearData } = SiteManagmentSlice.actions;
export const siteTableSelector = (state) => state.SiteTable;
export default SiteManagmentSlice.reducer