import { configureStore } from "@reduxjs/toolkit";
import ModelSliceReducer from "../features/modelFeatures/ModelSlice";

export const store = configureStore({
  reducer: {
    model: ModelSliceReducer,
  },
});
