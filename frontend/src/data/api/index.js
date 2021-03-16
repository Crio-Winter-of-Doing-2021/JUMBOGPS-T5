import * as assetApi from './asset';
import * as userApi from './user';

const services = {
    getAssetList: assetApi.getList,
    getAssetTrack: assetApi.track,
    getAssetTrackByTime: assetApi.trackByTime,
    postSignin: userApi.signin,
    postSignup: userApi.signup,
    getProfile: userApi.profile,
}

export default services;