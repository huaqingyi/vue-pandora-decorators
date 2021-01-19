import { Module, VuexModule, Action, Mutation, useService } from 'vue-pandora-decorators';
import store from '@/store';
import { AppResponse, AppService, AppTestRequset } from './appService';

export interface IAppState {
    datatime: string;
    tableData: AppResponse;
}

@Module({ store })
export class AppStore extends VuexModule implements IAppState {

    public get service() {
        return useService(AppService);
    }

    public datatime: string;
    public tableData: AppResponse;

    constructor(module: AppStore) {
        super(module);
        this.datatime = String((new Date()).getTime());
        this.tableData = new AppResponse();
    }

    @Action({ commit: 'testSuccess' })
    public async test(data: AppTestRequset) {
        return await this.service.test(data);
    }

    @Mutation
    public async testSuccess(data: AppResponse) {
        this.tableData = data;
        this.datatime = String((new Date()).getTime());
    }
}