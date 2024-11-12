import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can use sessionStorage as well

import { initSlice } from "./initSlice";
// Set up Redux Persist config
const persistConfig = {
  key: "root", // The key where the Redux state will be stored in storage
  storage, // You can use sessionStorage or localStorage here
  //whitelist: ["userData", "filesUploaded", "users", "searchValue"], // List the parts of the state you want to persist
};

const persistedReducer = persistReducer(persistConfig, initSlice.reducer);

export const reduxStore = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
});

export const persistor = persistStore(reduxStore); // Create the persistor
