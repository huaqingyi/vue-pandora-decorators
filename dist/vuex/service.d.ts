import { AxiosInstance } from 'axios';
export interface VuexService {
    http: AxiosInstance;
}
export declare const _service: {
    [x: number]: Service;
};
export declare class Service implements VuexService {
    http: AxiosInstance;
    static id: number;
    static get _service(): {
        [x: number]: Service;
    };
    static getService(id: number): Service;
    static _root(): typeof Service;
}
export declare function useService<S extends (new () => Service)>(Service: S & any): any;
