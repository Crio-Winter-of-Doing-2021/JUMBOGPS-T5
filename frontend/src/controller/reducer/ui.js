import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    asset: {},
    showLogoutModal: false,
    tabId: "1",
    error: "",
  },
  reducers: {
    pageLoaded: () => {},
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    loadAssetCard: (state, action) => ({ ...state, asset: action.payload }),
    setshowLogoutModal: (state, action) => ({
      ...state,
      showLogoutModal: action.payload,
    }),
    setTabId: (state, action) => ({ ...state, tabId: action.payload }),
    setError: (state, action) => ({ ...state, error: action.payload }),
  },
});

export const {
  pageLoaded,
  setLoading,
  loadAssetCard,
  setshowLogoutModal,
  setTabId,
  setError,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getLoading = (state) => state.ui.loading;

export const getAsset = (state) => state.ui.asset;

export const getShowLogout = (state) => state.ui.showLogoutModal;

export const getTabId = (state) => state.ui.tabId;

export const getError = (state) => state.ui.error;
