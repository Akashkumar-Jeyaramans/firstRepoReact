import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProtectedApis from "../../utils/apis/ProtectedApis";

export const currentUser = createAsyncThunk(
  "userProfile/currentUser",

  async (_, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("/currentUser");

      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        return data.payload.user;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "userProfile/updateUser",
  async (param, thunkAPI) => {
    try {
      const { id, displayName, email, avatar } = param;
      const response = await ProtectedApis.patch(`/users/${id}`, {
        displayName,
        email,
        avatar,
      });
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        thunkAPI.dispatch(currentUser());
        console.log("newUser data", data.payload);
        return data.payload;
      } else {
        return thunkAPI.rejectWithValue(data.payload.reason);
      }
    } catch (e) {
      console.log("Error", e.response.statusText);
    }
  }
);

export const currentUserSlice = createSlice({
  name: "userProfile",
  initialState: {
    id: "",
    name: "",
    displayName: "",
    role: "",
    avatar: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [currentUser.fulfilled]: (state, { payload }) => {
      state.id = payload?._id;
      state.name = payload?.name;
      state.displayName = payload?.displayName;
      state.role = payload?.role;
      state.email = payload?.email;
      state.avatar = payload?.avatar;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [currentUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [currentUser.pending]: (state) => {
      state.isFetching = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.name = payload?.name;
      state.displayName = payload?.displayName;
      state.role = payload?.role;
      state.email = payload?.email;
      state.avatar = payload?.avatar;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [updateUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const currentUserSelector = (state) => state.userProfile;
