import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProtectedApis from "../../utils/apis/ProtectedApis";

export const getAllUsers = createAsyncThunk(
  "UserManagement/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("/users/all");
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
export const requestSetUser = createAsyncThunk(
  "UserManagement/requestSetUser",
  async (param, thunkAPI) => {
    try {
      const { displayName, name, email, password, role, enable } = param;
      const response = await ProtectedApis.post("/users", {
        displayName,
        name,
        email,
        role,
        password,
        enable,
      });
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        thunkAPI.dispatch(getAllUsers());
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
export const requestUpdateUsers = createAsyncThunk(
  "UserManagement/requestUpdateUsers",
  async (param, thunkAPI) => {
    try {
      const { id, displayName, email, role, enable } = param;
      const response = await ProtectedApis.patch(`/users/${id}`, {
        displayName,
        email,
        role,
        enable,
      });
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        thunkAPI.dispatch(getAllUsers());
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
export const requestDeleteUsers = createAsyncThunk(
  "UserManagement/requestDeleteUsers",
  async (param, thunkAPI) => {
    try {
      const { id } = param;
      const response = await ProtectedApis.delete(`/users/${id}`);
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        thunkAPI.dispatch(getAllUsers());
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

export const requestDeleteSelectedUsers = createAsyncThunk(
  "UserManagement/requestDeleteSelectedUsers",
  async (param, thunkAPI) => {
    try {
      const response = await ProtectedApis.delete(`/users/all`, {
        params: { ids: param },
      });
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        thunkAPI.dispatch(getAllUsers());
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

export const requestSearchUsers = createAsyncThunk(
  "UserManagement/requestSearchUsers",
  async (param, thunkAPI) => {
    try {
      const response = await ProtectedApis.get(`/search/users/${param}`);
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

export const requestFilterUsers = createAsyncThunk(
  "UserManagement/requestFilterUsers",
  async (param, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("/users/all", {
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

export const UserManagementSlice = createSlice({
  name: "UserManagement",
  initialState: {
    users: [],
    total: 0,
    loadingUserList: false,
  },
  reducers: {
    clearData: (state) => {
      state.users = [];
      state.loadingUserList = false;
    },
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.users = payload.data;
      state.total = payload.total;
      state.loadingUserList = false;
    },
    [getAllUsers.pending]: (state, { payload }) => {
      state.users = [];
      state.total = 0;
      state.loadingUserList = true;
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.users = [];
      state.total = 0;
      state.loadingUserList = false;
    },
    [requestSearchUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      state.loadingUserList = false;
    },
    [requestSearchUsers.pending]: (state, { payload }) => {
      state.users = [];
      state.loadingUserList = true;
    },
    [requestSearchUsers.rejected]: (state, { payload }) => {
      state.users = [];
      state.loadingUserList = false;
    },
    [requestFilterUsers.fulfilled]: (state, { payload }) => {
      state.users = payload.data;
      state.total = payload.total;
      state.loadingUserList = false;
    },
    [requestFilterUsers.pending]: (state, { payload }) => {
      state.users = [];
      state.total = 0;
      state.loadingUserList = true;
    },
    [requestFilterUsers.rejected]: (state, { payload }) => {
      state.users = [];
      state.total = 0;
      state.loadingUserList = false;
    },
  },
});

export const { clearData } = UserManagementSlice.actions;
export const userManagementSelector = (state) => state.userManagement;
