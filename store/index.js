import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toast.slice";
import { kidApi } from "./kid.api";
import { userApi } from "./user.api";

export const setupStore = () => {
  return configureStore({
  reducer: {
    toast: toastReducer,
    [kidApi.reducerPath]: kidApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
    .concat(kidApi.middleware)
    .concat(userApi.middleware),
});
};

export const store = setupStore({});
