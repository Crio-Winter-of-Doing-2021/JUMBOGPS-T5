import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    token:'',//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcnVsMzY1QGdtYWlsLmNvbSIsImlhdCI6MTYxNTQ3NTc3MH0.OgPINiPGMGz432TeWiCk5AC967JTRU1sOr-wuyOKfTc',
    remember:false,
  },
  reducers: {
    performSignin: ()=>{},
    performSignUp:()=>{},
    loadUser: (state,action) => {
      console.log(action.payload);
      state.name =  action.payload.name;
      state.email =  action.payload.email;
      state.token =  action.payload.token;
    },
    loadProfile: () => {},
    removeUser: (state,action) =>  {
      state.name =  '';
      state.email =  '';
      state.token =  '';
    },
    setRemember:(state,action) =>  {
      state.remember =  action.payload;
    },
    loadLocalUser:()=>{},
    performLogout:()=>{},
  },
});

export const {
  performSignin,
  performSignUp,
  loadProfile,
  loadUser,
  removeUser,
  setRemember,
  loadLocalUser,
  performLogout
} = counterSlice.actions;

export default counterSlice.reducer;

export const getUser = (state) => state.user;

export const getToken = (state) => state.user.token;

export const getRemember = (state) => state.user.remember;
