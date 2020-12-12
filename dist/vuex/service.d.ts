import { AxiosInstance } from 'axios';
export interface VuexService {
    http: AxiosInstance;
}
export declare class Service implements VuexService {
    http: AxiosInstance;
}
