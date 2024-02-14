import { createSlice } from "@reduxjs/toolkit";

export const addToCart = createSlice({
  name: "addToCart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    AddToCart: (state, action) => {
      const newItem = action.payload;
      const id = newItem.barcode;
      const quantity = newItem.quantity;
      const find = state.find((item) => item.barcode === id);
      const items = [...state, newItem];
      const newData = state.map((item) =>
        item.barcode === id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              totalPrice: item.totalPrice + newItem.totalPrice,
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(find ? newData : items));
      return find ? newData : items;
    },

    DecrementCart: (state, action) => {
      const dec = state.map((item) => {
        if (item.barcode === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity <= 1 ? 1 : item.quantity - 1,
            totalPrice: item.totalPrice - item.price,
          };
        } else {
          return item;
        }
      });

      localStorage.setItem("cart", JSON.stringify(dec));
      return dec;
    },

    IncrementCart: (state, action) => {
      const inc = state.map((item) => {
        if (item.barcode === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity < 1 ? 1 : item.quantity + 1,
            totalPrice: item.totalPrice + item.price,
          };
        } else {
          return item;
        }
      });

      localStorage.setItem("cart", JSON.stringify(inc));
      return inc;
    },

    RemoveFromCart: (state, action) => {
      let id = action.payload;
      let res = (state = state.filter((i) => i.barcode !== id));
      localStorage.setItem("cart", JSON.stringify(res));
      return res;
    },
    ClearCart: (state, action) => {
      let empty = (state = []);
      localStorage.removeItem("cart");
      return empty;
    },
  },
});

export const {
  AddToCart,
  DecrementCart,
  RemoveFromCart,
  IncrementCart,
  ClearCart,
} = addToCart.actions;
export default addToCart.reducer;
