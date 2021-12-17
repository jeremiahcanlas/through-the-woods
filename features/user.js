import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return initialState;
    },
    default: () => {
      return initialState;
    },
  },
});

export const { login, clearUser } = userSlice.actions;

export default userSlice.reducer;
