import { AxiosInstance } from 'axios';

// tslint:disable-next-line:interface-name
export interface VuexService {
    http: AxiosInstance;
}

export class Service implements VuexService {
    public http!: AxiosInstance;
}