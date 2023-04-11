import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toast.slice";
import { kidApi } from "./kid.api";

export const setupStore = () => {
  return configureStore({
  reducer: {
    toast: toastReducer,
    [kidApi.reducerPath]: kidApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
    .concat(kidApi.middleware),
});
};

export const store = setupStore({});
