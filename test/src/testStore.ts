import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule,
} from 'vue-pandora-decorators';
import store from '@/store';

export interface ITestState {
}

@Module({ dynamic: true, store, name: 'Test' })
export class TestStore extends VuexModule implements ITestState {

    public name: string;

    constructor(module: TestStore) {
        super(module);
        this.name = 'test';
    }

    @Action
    public async updateTest(data: any) {
        console.log('action');
        return await data;
    }

    @Mutation
    public async addTest(Test: any) {
        console.log(Test, this);
        return await { Test, ...this };
    }
}

export const Test = getModule(TestStore);
