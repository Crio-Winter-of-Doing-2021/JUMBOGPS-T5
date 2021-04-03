import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    token: "", 
    remember: false,
    profile: {
      name: "",
      isMale: true,
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
      state.profile.name = action.payload.name;
    },
    loadProfile: () => {},
    loadProfileSuccess: (state, action) => {
      state.name = action.payload.name;
      state.profile = action.payload;
    },
    removeUser: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
    },
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
    loadLocalUser: () => {},
    performLogout: () => {},
    updateProfile : () => {},
    updatePassword : () => {}
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
  updateProfile,
  updatePassword
} = counterSlice.actions;

export default counterSlice.reducer;

export const getUser = (state) => state.user;

export const getEmail = (state) => state.user.email;

export const getProfile = (state) => state.user.profile;

export const getToken = (state) => state.user.token;

export const getRemember = (state) => state.user.remember;
