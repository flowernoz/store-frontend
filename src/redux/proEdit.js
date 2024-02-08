import { createSlice } from "@reduxjs/toolkit";

export const proEdit = createSlice({
  name: "proEdit",
  initialState: [],
  reducers: {
    PRO_EDIT: (state, action) => {
      let data = action.payload.data;
      return data;
    },
  },
});

export const { PRO_EDIT } = proEdit.actions;

export default proEdit.reducer;
