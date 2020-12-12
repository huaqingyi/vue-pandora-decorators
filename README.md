# Vue Pandora Decorators

* npm i vue-pandora-decorators --save
* yarn add vue-pandora-decorators

## 本插件基于 VUE 3.0 开发
* vuex 修饰器及 **Composition API** 支持
* 面向对象 **@Component** 支持
* 提供 **@Mixin** 继承
* 本插件主要是用 Proxy 代理模式 代理 Vue Context

## 基础使用

### Component 修饰器使用 使用

* components/test2.vue
```vue
<template>
    <div>Test2 ...</div>
    <div>{{aaa}}</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
    <div>{{test}}</div>
    <div>{{computed}}</div>
    <el-button @click="()=>edit()">修改</el-button>
</template>
<script lang="ts">
import { ToRefs, watch } from 'vue';
import { Component, dynamic, Prop, PureComponent, Reactived, computed } from 'vue-pandora-decorator';

export interface Props {
    aaa: number;
}

export interface State {
    name: number;
    object: any;
}

// 这里可以不定义 Props 和 State 默认 any
@Component
export default class Test2 extends PureComponent<Props, State> implements Reactived<State> {
    
    @dynamic
    public name: number;
    
    @dynamic
    public object: any;

    public test: boolean;

    @Prop
    public aaa!: number;

    @computed
    public get computed() {
        return `${(new Date).getTime()} ${this.aaa} ${JSON.stringify(this.object)}`;
    }

    constructor(props: any, ctx: any){
        super(props, ctx);
        this.name = 111;
        this.object = {};
        this.test = true;
        // // 下面两种等同
        // console.log(this.aaa);
        // console.log(this.props.aaa);
    }

    // 开始生成响应式数据
    onReactived() {
        console.log(`on reactived ...`);
    }

    // 这里 return 的数据会自动 merge 到 component
    public setup(props: any, ctx: any) {
    }

    // 在 setup 后 merge component 完成
    // 可选
    // public reactived() {
    // public reactived(data: ToRefs<this>) {
    public reactived(data: ToRefs<State>) {
        console.log(`reactived ...`);
    }

    // 数据初始化完成 返回到 上下文之前
    // 未定义 State
    // public didReactived(data:ToRefs<this>) {
    // 以定义 State
    public didReactived(data: ToRefs<State>){
        // 下面两种等同
        // watch(this.state.name, ()=>{
        //     console.log(`监听修改 ...`);
        // });
        watch(data.name, ()=>{
            console.log(`监听修改 ...`);
        });
        console.log(`did reactived ...`);
        // 这里一可以 return 初始数据
        return data;
    }

    public edit() {
        console.log(11111, this.name, this.test);
        this.name++;
        this.object.time = (new Date).getTime();
        this.test = !this.test;
    }

    public editProps(){
        this.aaa += 100;
    }
}
</script>
```

* 继承 使用 component/test3.vue
```vue
<template>
    <div>Test3 ...</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
</template>
<script lang="ts">
import { Component, Mixin } from 'vue-pandora-decorators';
import Test2 from './test2.vue';

@Component
export default class extends Mixin(Test2) {
}
</script>
```

* 不使用修饰器 home.vue
```vue
<template>
    <div>Dec ...</div>
    <div>{{name}}</div>
    <div>{{object}}</div>
    <test2 :aaa="aaa"></test2>
    <test3></test3>
</template>
<script lang="ts">
import { reactive, ref } from 'vue';
import Test1 from './components/test1.vue';
import Test2 from './components/test2.vue';
import Test3 from './components/test3.vue';

export default {
    components: {
        Test1,
        Test2,
        Test3,
    },
    setup() {
        const aaa = ref(333);
        setInterval(()=>{
            aaa.value ++;
        }, 1000);
        return { name: ref(111), object: reactive({}), aaa }
    }
}
</script>
```

### vuex 修饰器使用
* 全局 dynamic 模式
* 入口 store/index.ts
```typescript
import { createStore } from 'vuex';
import { PermissionState } from './modules/permission';

export interface IRootState {
    permission: PermissionState;
}

export default createStore<IRootState>({});
```
* store/modules/permission.ts
```typescript

import { VuexModule, Module, Action, Mutation, getModule } from 'vue-pandora-decorators';
import store from '/@/store';

export interface PermissionState {
    sessiontoken: string;
    freshtoken: string;
    roles: string[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
    public sessiontoken: string;
    public freshtoken: string;
    public roles: string[];

    constructor(props: any) {
        super(props);
        this.sessiontoken = sessionStorage.getItem('sessiontoken') || '';
        this.freshtoken = sessionStorage.getItem('freshtoken') || '';
        this.roles = [];
        // this.routes = constantRoutes.concat(asyncRoutes);
        // this.dynamicRoutes = asyncRoutes;
    }

    @Action
    public test(roles: string[]) {
        console.log(this);
        return this.setTest(roles);
    }

    @Mutation
    private setTest(roles: string[]) {
        console.log(roles);
        this.roles = roles;
        return roles;
    }

    // @Action
    // public generateRoutes(roles: string[]) {
    //     let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    //     this.settingRoutes(accessedRoutes);
    // }

    // @Mutation
    // private settingRoutes(routes: RouteConfig[]) {
    //     this.routes = constantRoutes.concat(routes);
    //     this.dynamicRoutes = routes;
    // }
}

export const PermissionModule = getModule(Permission);
```

* 使用方法 随便一个 vue 文件
```vue
<template>
    <div>
        <div>{{roles}}</div>
        <el-button @click="() => test(['1','2','3'])">Test</el-button>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { PermissionModule } from '../store/modules/permission';
export default defineComponent({
    setup() {
        return {
            roles: computed(() => PermissionModule.roles),
            test: PermissionModule.test,
        };
    }
})
</script>
```
* 模块化异步使用 在模块中异步 注入
* 如 layout/store.ts
```typescript
import { VuexModule, Module, Action, Mutation } from 'vue-pandora-decorators';
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
        return obj;
    }

    @Mutation
    protected testActionSuccess(obj: string[]) {
        this.testObj = { ...this.testObj, [(new Date).getTime()]: obj };
        return this.testObj;
    }
}
```
* layout/layout.vue
```vue
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
</script>
```

### 在最后感谢一下 vuex-module-decorators 的作者
* 这里偷懒直接使用大佬的 库 十分感谢
* 后续迭代更多 需要支持的 API
* 最后再提一嘴 VUE 3.0 深入理解后确实不错 一开始看到 这意大利面条真心没胃口 
* 但经过思想斗争后 开始 开发这个插件 写到后面发现 面向对象与 Composition API 可以擦出别样的火花
* 感谢尤大大
* 请根据自己喜好食用 ✌️
