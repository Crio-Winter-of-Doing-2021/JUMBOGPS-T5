import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "geo",
  initialState: {
    geoFence: null,
    geoRoute: null,
    notifications: [],
  },
  reducers: {
    loadGeoFence: () => {},
    loadGeoFenceSuccess: (state, action) => {
      state.geoFence = action.payload.data;
    },
    updateGeoFence: () => {},
    loadGeoRoute: () => {},
    loadGeoRouteSuccess: (state, action) => {
      state.geoRoute = action.payload.data;
    },
    setGeoFence: (state, action) => {
      state.geoFence = action.payload;
    },
    updateGeoRoute: () => {},
    loadNotifications: () => {},
    loadNotificationsSuccess: (state, action) => {
      state.notifications = action.payload.data.track;
    },
    setGeoRoute: (state, action) => {
      state.geoRoute = action.payload;
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
} = counterSlice.actions;

export default counterSlice.reducer;

export const getGeoFence = (state) => state.geo.geoFence;

export const getGeoRoute = (state) => state.geo.geoRoute;

export const getNotifications = (state) => state.geo.notifications;
