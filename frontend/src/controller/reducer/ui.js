import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    asset : {}
},
  reducers: {
    pageLoaded: ()=>{},
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    loadAssetCard:(state, action) => ({ ...state, asset: action.payload }),

  },
});

export const { pageLoaded,setLoading, loadAssetCard } = counterSlice.actions;

export default counterSlice.reducer;

export const getLoading = state => state.ui.loading;

export const getAsset = state => state.ui.asset;
