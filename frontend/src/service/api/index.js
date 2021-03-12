import * as assetApi from './asset';
import * as userApi from './user';

const services = {
    getAssetList: assetApi.getList,
    getAssetTrack: assetApi.track,
    performSignin: userApi.signin,
    performSignup: userApi.signup,
    getProfile: userApi.profile,
}

export default services;