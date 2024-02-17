import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import { api } from "./api";


export const store = configureStore({
  reducer: {
    cart,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

});
