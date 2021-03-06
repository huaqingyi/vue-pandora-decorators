import { AxiosInstance } from 'axios';
export interface VuexService {
    http: AxiosInstance;
}
export declare const _service: {
    [x: number]: any & Service;
};
export declare class Service implements VuexService {
    http: AxiosInstance;
    static id: number;
    static get _service(): {
        [x: number]: any;
    };
    static setService(id: number, service: Service): Service;
    static getService<T>(id: number): T;
    static _root(): typeof Service;
}
export declare type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
