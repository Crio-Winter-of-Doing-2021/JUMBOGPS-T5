import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    error: null,
  },
  reducers: {
    performSignin: () => {},
    performSignUp: () => {},
    loadProfile: () => {},

  },
});

export const {
  performSignin,
  performSignUp,
  loadProfile,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getUser = (state) => state.user.user;

export const getToken = (state) => state.user.user.token;
