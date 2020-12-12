import { VuexModule, Module, Action, Mutation } from 'vue-pandora-decorator';
import store from '/@/store';

export interface LayoutState {
    testObj: {
        name: string;
        test?: { name: string; }
    };
}

@Module({ store })
export class Layout extends VuexModule implements LayoutState {
    public testObj: { name: string; };

    constructor(props: any) {
        super(props);
        this.testObj = { name: '111' };
    }

    @Action({ commit: 'testActionSuccess' })
    public testAction(obj: string[]) {
        // console.log(1111111111111111112, obj, this);
        return obj;
    }

    @Mutation
    protected testActionSuccess(obj: string[]) {
        // console.log(22222222222222223, obj);
        this.testObj = { ...this.testObj, [(new Date).getTime()]: obj };
        return this.testObj;
    }
}
