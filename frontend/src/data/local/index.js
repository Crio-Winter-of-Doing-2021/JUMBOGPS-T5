import * as userApi from './user';

const services = {
    saveLocalUser: userApi.saveUser,
    getLocalUser: userApi.retrieveUser,
    deleteLocalUser: userApi.removeUser,
}

export default services;