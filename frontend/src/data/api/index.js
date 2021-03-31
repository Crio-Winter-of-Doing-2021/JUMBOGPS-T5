import * as assetApi from './asset';
import * as userApi from './user';
import * as geoApi from './geo';

const services = {
    getAssetList: assetApi.getList,
    getAssetTrack: assetApi.track,
    getAssetTrackByTime: assetApi.trackByTime,

    postSignin: userApi.signin,
    postSignup: userApi.signup,
    putPassword: userApi.passwordUpdate,
    
    getProfile: userApi.profile,
    putProfile: userApi.profileUpdate,

    getGeoFence: geoApi.getGeoFence,
    getGeoRoute: geoApi.getGeoRoute,
    putGeoFence: geoApi.putGeoFence,
    putGeoRoute: geoApi.putGeoRoute,
    
    getNotifications: geoApi.notifications,
}

export default services;