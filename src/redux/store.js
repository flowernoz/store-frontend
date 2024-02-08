import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import proEdit from "./proEdit";

export const store = configureStore({
  reducer: {
    cart,
    proEdit,
  },
});
