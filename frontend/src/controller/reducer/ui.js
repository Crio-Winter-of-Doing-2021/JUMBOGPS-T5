import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "todos",
  initialState: {
    loading: false
},
  reducers: {
    pageLoaded: ()=>{},
    setLoading: (state, action) => ({ ...state, loading: action.payload }),

  },
});

export const { pageLoaded,setLoading } = counterSlice.actions;

export default counterSlice.reducer;

export const getLoading = state => state.ui.loading;

