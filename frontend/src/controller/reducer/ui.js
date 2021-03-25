import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    showLogoutModal: false,
    tabId: "1",
    trackTabId: "1",
    error: "",
  },
  reducers: {
    pageLoaded: () => {},
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    setshowLogoutModal: (state, action) => ({
      ...state,
      showLogoutModal: action.payload,
    }),
    setTabId: (state, action) => ({ ...state, tabId: action.payload }),
    setTrackTabId: (state, action) => ({ ...state, trackTabId: action.payload }),
    setError: (state, action) => ({ ...state, error: action.payload }),
  },
});

export const {
  pageLoaded,
  setLoading,
  setshowLogoutModal,
  setTabId,
  setError,
  setTrackTabId,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getLoading = (state) => state.ui.loading;

export const getShowLogout = (state) => state.ui.showLogoutModal;

export const getTabId = (state) => state.ui.tabId;

export const getError = (state) => state.ui.error;

export const getTrackTabId = (state) => state.ui.trackTabId;