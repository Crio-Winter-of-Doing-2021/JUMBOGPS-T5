import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    showLogoutModal: false,
    tabId: "1",
    trackTabId: "1",
    error: "",
    message: "",
    showSideNav: true,
    deviceSize : "lg",
  },
  reducers: {
    pageLoaded: () => {},
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
    setshowLogoutModal: (state, action) => ({
      ...state,
      showLogoutModal: action.payload,
    }),
    setTabId: (state, action) => ({ ...state, tabId: action.payload }),
    setTrackTabId: (state, action) => ({
      ...state,
      trackTabId: action.payload,
    }),
    setError: (state, action) => ({ ...state, error: action.payload }),
    setSuccessToast: (state, action) => ({ ...state, message: action.payload }),
    toggleSidenav: (state) => {
      state.showSideNav = !state.showSideNav;
    },
    hideSidenav: () => {},
    setDeviceSize:(state, action)  => {
      state.deviceSize = action.payload;
    },
  },
});

export const {
  setSuccessToast,
  pageLoaded,
  setLoading,
  setshowLogoutModal,
  setTabId,
  setError,
  setTrackTabId,
  toggleSidenav,
  setDeviceSize,
  hideSidenav
} = counterSlice.actions;

export default counterSlice.reducer;

export const getLoading = (state) => state.ui.loading;

export const getShowLogout = (state) => state.ui.showLogoutModal;

export const getTabId = (state) => state.ui.tabId;

export const getError = (state) => state.ui.error;

export const getToastMessage = (state) => state.ui.message;

export const getTrackTabId = (state) => state.ui.trackTabId;

export const getShowSidenav = (state) => state.ui.showSideNav;

export const getDeviceSize = (state) => state.ui.deviceSize;
