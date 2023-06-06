import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/Auth";
import AuthSlice from "./services/AuthSlice";
import { contactApi } from "./api/contactApi";
import ContactSlice from "./services/ContactSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    AuthSlice: AuthSlice,
    ContactSlice: ContactSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, contactApi.middleware),
});
