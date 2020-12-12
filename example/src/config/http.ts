import { AxiosRequestConfig } from 'axios';

declare const VITE_HTTP_BASE_URL: string;

console.log(VITE_HTTP_BASE_URL)

export default {
    baseURL: VITE_HTTP_BASE_URL,
} as AxiosRequestConfig;
