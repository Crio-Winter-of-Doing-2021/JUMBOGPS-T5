import networkService from './api';
import localService from './local';

const services = {
    ...networkService,
    ...localService,
}

export default services;