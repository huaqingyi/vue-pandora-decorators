import { AxiosInstance } from 'axios';

// tslint:disable-next-line:interface-name
export interface VuexService {
    http: AxiosInstance;
}

export class Service implements VuexService {
    public http!: AxiosInstance;
}

export function autowired(component: (new (...props: any[]) => any)) {
    return (target: any, key: string) => {
        console.log(target, key);
        const type = Reflect.getMetadata('design:type', target, key);
        console.log(`${key} type: ${type}`);
    }
}
