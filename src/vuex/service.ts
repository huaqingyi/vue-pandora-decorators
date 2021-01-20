import { AxiosInstance } from 'axios';

export interface VuexService {
    http: AxiosInstance;
}

export const _service: { [x: number]: any & Service } = {};

export class Service implements VuexService {
    public http!: AxiosInstance;
    public static id: number;

    public static get _service() {
        return _service;
    }

    public static setService(id: number, service: Service) {
        return _service[id] = service;
    }

    public static getService<T>(id: number): T {
        return _service[id];
    }

    public static _root() {
        return Service;
    }
}

export declare type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
