export const BASE_URL = "http://localhost:8000";

export const SIGN_IN_URL = `${BASE_URL}/auth/signin`;
export const SIGN_UP_URL = `${BASE_URL}/auth/signup`;
export const PROFILE_URL = `${BASE_URL}/auth/user`;

export const ASSET_LIST_URL = `${BASE_URL}/api/asset/list`;
export const trackUrl = (id) => `${BASE_URL}/api/asset/track/${id}`;
export const trackUrlByTime = (id) =>  `${BASE_URL}/api/asset/trackbytime/${id}`;
export const assetListUrl = (type) => `${BASE_URL}/api/asset/list?type=${type}`;

export const geoFenceUrl = (id) => `${BASE_URL}/api/asset/geofence/${id}`;
export const geoRouteUrl = (id) => `${BASE_URL}/api/asset/georoute/${id}`;
export const getGeoFenceUrl = (id) => `${BASE_URL}/api/asset/getgeofence/${id}`;
export const getGeoRouteUrl = (id) => `${BASE_URL}/api/asset/getgeoroute/${id}`;
export const notificationUrl = (id) => `${BASE_URL}/api/asset/notification/${id}`;