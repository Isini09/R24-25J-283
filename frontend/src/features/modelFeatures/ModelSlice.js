import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ModelService from "./ModelService";
const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const postDatatoModel = createAsyncThunk(
  "model/postDatatoModel",
  async (data, thunkAPI) => {
    try {
      return await ModelService.postDatatoModel(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ModelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDatatoModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postDatatoModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(postDatatoModel.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ModelSlice.actions;
export default ModelSlice.reducer;
