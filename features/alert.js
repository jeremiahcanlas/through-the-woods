import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return action.payload;
    },
    removeAlert: () => {
      return initialState;
    },
    default: () => {
      return initialState;
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
