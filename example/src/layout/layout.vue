<template>
    <div>
        <div>{{roles}}</div>
        <div>{{computed}}</div>
        <el-button @click="() => test(['1','2','3'])">Test</el-button>
    </div>
    <!-- <div>
        <div>{{testObj}}</div>
        <el-button @click="() => editObj(['1','3'])">测试 Composition API</el-button>
    </div>
    <el-button @click="() => testAction(['1','3'])">测试 Vuex 抽离的控制器层</el-button> -->
    <router-view />
</template>
<script lang="ts">
import { Component, PureComponent, state, computed } from 'vue-pandora-decorator';
import { PermissionModule } from '../store/modules/permission';
// import { Layout, LayoutState } from './store';

@Component
export default class extends PureComponent {

    @state(()=> PermissionModule.roles)
    public roles!: string[];

    @computed
    public get computed() {
        return `${(new Date).getTime()}${(this.roles || []).join('')}`;
    }

    public get test() {
        return PermissionModule.test;
    };

    constructor(props: any,ctx:any){
        super(props,ctx);
        this.roles = PermissionModule.roles;
    }
}

// export default defineComponent({
//     setup() {
//         const state = useState<LayoutState>(Layout);
//         useAction(Layout).testAction(['1','3']);

//         const actions = useActions(Layout);

//         return {
//             roles: computed(() => PermissionModule.roles),
//             ...state,
//             test: PermissionModule.test,
//             editObj: useAction(Layout).testAction,
//             ...actions,
//         };
//     }
// })
</script>