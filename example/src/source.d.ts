declare const React: string;
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';

import 'vue';
import { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $http: AxiosInstance;
    }
}
