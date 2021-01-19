import { AxiosInstance } from 'axios';

// tslint:disable-next-line:interface-name
export interface VuexService {
    http: AxiosInstance;
}

export const _service: { [x: number]: Service } = {};

export class Service implements VuexService {
    public http!: AxiosInstance;
    public static id: number;

    public static get _service() {
        return _service;
    }

    public static getService(id: number) {
        return _service[id];
    }

    public static _root() {
        return Service;
    }
}

export function useService<S extends (new () => Service)>(Service: S & any) {
    if (!Service.id) {
        Service.id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
    }
    if (!_service[Service.id]) { _service[Service.id] = new Service(); }
    return Service.getService(Service.id);
}
