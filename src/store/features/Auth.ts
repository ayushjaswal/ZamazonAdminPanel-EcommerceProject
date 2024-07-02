import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { path } from "../../variables";
import { AuthState, config } from "../../types/types";

const initialState: AuthState = {
  email: "",
  name: "",
  profile: "",
};

export const asyncAuthSlice = createAsyncThunk(
  "auth/asyncAuthSlice",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.post(`${path}/login`, { token }, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const asyncSessionSlice = createAsyncThunk(
  "auth/asyncSessionSlice",
  async () => {
    try {
      const response = await axios.get(`${path}/login`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const asyncLogout = createAsyncThunk("auth/asyncLogout", async () => {
  try {
    const response = await axios.get(`${path}/logout`, config);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncAuthSlice.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.profile = action.payload.profile;
    });
    builder.addCase(asyncSessionSlice.fulfilled, (state, action) => {
      if (action.payload) {
        state.name = action.payload.name;
        state.profile = action.payload.profile;
        state.email = action.payload.email;
      }
    });
    builder.addCase(asyncLogout.fulfilled, (state, action) => {
      if (action.payload) {
        state.email = "";
        state.name = "";
        state.profile = "";
      }
    });
  },
});

export default AuthSlice.reducer;
