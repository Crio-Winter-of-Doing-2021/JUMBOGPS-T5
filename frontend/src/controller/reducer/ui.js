import { createSlice } from "@reduxjs/toolkit";
import logger from "../../utils/logger";

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
    unSeenNotifications:[],
    unSeenAssetNotifications:[],
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
    setUnseenNotifications:(state, action)  => {
      state.unSeenNotifications = action.payload;
    },
    setUnseenAssetNotifications:(state, action)  => {
      logger(action.payload);
      state.unSeenAssetNotifications = action.payload;
    },
    addUnseenNotifications:(state, action)  => {
      state.unSeenNotifications.push(action.payload);
    },
    addUnseenAssetNotifications:(state, action)  => {
      logger(action.payload);
      state.unSeenAssetNotifications.push(action.payload);
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
  hideSidenav,
  setUnseenNotifications,
  setUnseenAssetNotifications,
  addUnseenNotifications,
  addUnseenAssetNotifications
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

export const getUnseenNotifications = (state) => state.ui.unSeenNotifications;

export const getUnseenAssetNotifications = (state) => state.ui.unSeenAssetNotifications;
