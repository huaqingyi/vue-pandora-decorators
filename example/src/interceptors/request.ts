import { AxiosInstance } from 'axios';
import { app } from '../core';

const $http: AxiosInstance = app.config.globalProperties.$http;

$http.interceptors.request.use(config => {
    return config;
});

$http.interceptors.response.use(response => {
    return response;
});
