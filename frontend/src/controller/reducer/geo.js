import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "geo",
  initialState: {
    geoFence: null,
    geoRoute: null,
    notifications: [],
    assetNotifications: [],
  },
  reducers: {
    loadGeoFence: () => {},
    loadGeoFenceSuccess: (state, action) => {
      state.geoFence = action.payload;
    },
    updateGeoFence: () => {},
    loadGeoRoute: () => {},
    loadGeoRouteSuccess: (state, action) => {
      state.geoRoute = action.payload;
    },
    setGeoFence: (state, action) => {
      state.geoFence = action.payload;
    },
    updateGeoRoute: () => {},
    loadNotifications: () => {},
    loadNotificationsSuccess: (state, action) => {
      state.notifications = action.payload;
    },
    loadAssetNotifications: () => {},
    loadAssetNotificationsSuccess: (state, action) => {
      state.assetNotifications = action.payload;
    },
    setGeoRoute: (state, action) => {
      state.geoRoute = action.payload;
    },
    addNotification:(state, action) => {
      state.notifications = [{...action.payload,seen:false},...state.notifications];
    },
    addAssetNotification:(state, action) => {
      state.assetNotifications = [{...action.payload,seen:false},...state.assetNotifications];
    },
  },
});

export const {
  loadGeoFence,
  loadGeoFenceSuccess,
  loadGeoRoute,
  loadGeoRouteSuccess,
  loadNotifications,
  loadNotificationsSuccess,
  putDbGeoFence,
  updateGeoFence,
  updateGeoRoute,
  setGeoFence,
  setGeoRoute,
  loadAssetNotifications,
  loadAssetNotificationsSuccess,
  addNotification,
  addAssetNotification
} = counterSlice.actions;

export default counterSlice.reducer;

export const getGeoFence = (state) => state.geo.geoFence;

export const getGeoRoute = (state) => state.geo.geoRoute;

export const getNotifications = (state) => state.geo.notifications;

export const getAssetNotifications = (state) => state.geo.assetNotifications;
