import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProtectedApis from "../utils/apis/ProtectedApis";
import PublicApis from "../utils/apis/PublicApis";

export const loginUser = createAsyncThunk(
  "userAuth/login",
  async ({ name, password }, thunkAPI) => {
    try {
      const response = await PublicApis.post("/token", {
        name,
        password,
      });
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        sessionStorage.setItem("okratoken", data.payload.token.refreshToken);
        sessionStorage.setItem("okrauser", data.payload.user.name);
        ProtectedApis.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.payload.token.refreshToken}`;
        return data.payload.user;
      } else {
        return thunkAPI.rejectWithValue(data.payload.reason);
      }
    } catch (e) {
      console.log("Error", e.message);
      if (e.response) return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getLoggedinUser = createAsyncThunk(
  "userAuth/getLoggedinUser",
  async (_, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("/currentUser");
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        return data.payload.user;
      } else {
        return thunkAPI.rejectWithValue(data.payload.reason);
      }
    } catch (e) {
      console.log("Error", e);
      if (e.response) return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    name: "",
    role: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    // Reducer comes here
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    clearAuthData: (state) => {
      state.name = "";
      state.role = "";
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    setUser: (state, { payload }) => {
      state.name = payload;
      return state;
    },
    logoutUser: (state) => {
      state.name = "";
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      return state;
    },
  },
  extraReducers: {
    // Extra reducer comes here
    [loginUser.fulfilled]: (state, { payload }) => {
      state.name = payload?.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [getLoggedinUser.fulfilled]: (state, { payload }) => {
      state.role = payload?.role;
      state.name = payload?.name;
      return state;
    },
  },
});

export const { clearState, setUser, logoutUser, clearAuthData } =
  userAuthSlice.actions;
export const userAuthSelector = (state) => state.userAuth;
