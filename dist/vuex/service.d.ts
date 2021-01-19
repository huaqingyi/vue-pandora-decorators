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
export declare type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
export declare function useService<S>(Service: ServiceClass<S>): S;
