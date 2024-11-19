import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage or sessionStorage
import { initSlice } from "./initSlice";

const persistConfig = {
  key: "root",
  storage, // You can use localStorage or sessionStorage here
  whitelist: ["userData", "filesUploaded", "users", "searchValue"], // Persist only these slices
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, initSlice.reducer);

// Configure store with redux-persist
export const reduxStore = configureStore({
  reducer: {
    initReducer: persistedReducer, // Wrap your reducer with persistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/REGISTER",
        ], // Ignore serializable check for persist actions
      },
    }),
});

export const persistor = persistStore(reduxStore);
