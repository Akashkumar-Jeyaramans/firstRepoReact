import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProtectedApis from "../utils/apis/ProtectedApis";

const initialState = [];

const create = data => {
    return ProtectedApis.post("/sites", data);
  };
export const createTree = createAsyncThunk(
  "sites/create",
  async ({ name, hierarchy, type, latitude, longitude }, thunkAPI) => {
    try {
      const response = await create({ name, hierarchy, type, latitude, longitude });
      let data = await response.data;
      console.log(data)
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


const getAll = () => {
  return ProtectedApis.get("/sites/tree");
};
export const retrieveTree = createAsyncThunk(
  "treeSlice/retrieve/tree",
  async (_, thunkAPI) => {
    try {
      const res = await getAll();
      let datas = await res.data;
      let getdatas = datas.payload.data;
      if (res.status === 200 && res.data.code === 0){
        return getdatas;
      } else {
        return thunkAPI.rejectWithValue(datas.reason);
      }
    } 
    catch (e) {
      console.log("Error", e.res.statusText);
      if (e.res) return thunkAPI.rejectWithValue(e.res.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);



export const retrieveSite = createAsyncThunk(
  "treeSlice/retrieve/site",
  async (_, thunkAPI) => {
    try {
      const response = await ProtectedApis.get("/sites/all");
      let data = await response.data;
      if (response.status === 200 && response.data.code === 0) {
        return data.payload.data;
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


const remove = id => {
    return ProtectedApis.delete(`/sites/${id}`);
  };
export const deleteTree = createAsyncThunk(
  "trees/delete",
  async ( id ) => {
    await remove(id);
    return id;
  }
);


const removeAll = id => {
  return ProtectedApis.delete(`/sites/${id}`);
};
export const deleteAllTree = createAsyncThunk(
  "trees/all/delete",
  async ( id ) => {
    await removeAll(id);
    return id;
  }
);


const updateDataSite = (_id, data) => {
  return ProtectedApis.put(`sites/${_id}`, data);
};
export const updateSite = createAsyncThunk(
  "treeSlice/site/update",
  async ({ _id, data }, thunkAPI) => {
    try {
      const response = await updateDataSite(_id, data);
      let datas = await response.data;
      if (response.status === 200  && response.data.code === 5) {
        return datas.payload.data;
      } else {
        return thunkAPI.rejectWithValue(datas.payload.reason);
      }
    } catch (e) {
      console.log("Error", e.response.statusText);
      if (e.response) return thunkAPI.rejectWithValue(e.response.statusText);
      else return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const treeSlice = createSlice({
  name: "treeSlice",
  initialState,
  extraReducers: {
    [createTree.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTree.fulfilled]: (state, action) => {
      return [...action.payload];
    },

    [retrieveSite.fulfilled]: (state, action) => {
      return [...action.payload];
    },

    [deleteTree.fulfilled]: (state, action) => {
      let index = state.findIndex(( id ) => id === action.payload.id);
      state.splice(index, 1);
    },

    [deleteAllTree.fulfilled]: (state, action) => {
      let index = state.findIndex(( id ) => id === action.payload.id);
      state.splice(index, 1);
    },

    [updateSite.fulfilled]: (state, action) => {
      const index = state.findIndex(treeSlice => treeSlice.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
  },
});

export const treeAuthSelector = (state) => state.tree;

const get = _id => {
  return ProtectedApis.get(`sites/${_id}`);
};

const UpdateService = {
  get,
};

export default UpdateService;