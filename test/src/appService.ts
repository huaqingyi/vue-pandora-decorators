import { Service } from './src';

export interface TestAppData {
    username: string;
    password: string;
}

export class AppResponse {
    public data: TestAppData[];
    constructor() {
        this.data = [];
    }
}

export interface AppTestRequset { }

export class AppService extends Service {
    public async test(data: AppTestRequset): Promise<AppResponse> {
        console.log(1111);
        return new AppResponse();
    }
}
