import { configureStore } from "@reduxjs/toolkit";
import { initSlice } from "./initSlice";

export const reduxStore = configureStore({
  reducer: {
    initReducer: initSlice.reducer,
  },
});
