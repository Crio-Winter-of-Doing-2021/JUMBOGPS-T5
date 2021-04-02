import axios from 'axios';
import * as Urls from "../constants/Urls";


export const getGeoFence = (authToken,assetId) =>
  axios.get(Urls.getGeoFenceUrl(assetId), {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  export const getGeoRoute = (authToken,assetId) =>
  axios.get(Urls.getGeoRouteUrl(assetId), {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  export const putGeoFence = (authToken,assetId,geoFence) =>
  axios.put(Urls.geoFenceUrl(assetId),geoFence, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  export const putGeoRoute = (authToken,assetId,geoRoute) =>
  axios.put(Urls.geoRouteUrl(assetId),geoRoute, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });
  
  export const assetNotifications = (authToken,assetId) =>
  axios.get(Urls.notificationUrl(assetId), {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  export const notifications = (authToken) =>
  axios.get(Urls.NOTIFICATION_URL, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });