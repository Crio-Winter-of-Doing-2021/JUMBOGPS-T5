import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    token: "", 
    remember: false,
    profile: {
      male: true,
      phone: 0,
      address: "",
      role: "Site Administrator",
      about: "",
    },
  },
  reducers: {
    performSignin: () => {},
    performSignUp: () => {},
    loadUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    loadProfile: () => {},
    loadProfileSuccess: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    removeUser: (state, action) => {
      state.name = "";
      state.email = "";
      state.token = "";
    },
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    loadLocalUser: () => {},
    performLogout: () => {},
  },
});

export const {
  performSignin,
  performSignUp,
  loadProfile,
  loadProfileSuccess,
  loadUser,
  removeUser,
  setRemember,
  loadLocalUser,
  performLogout,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getUser = (state) => state.user;

export const getToken = (state) => state.user.token;

export const getRemember = (state) => state.user.remember;
