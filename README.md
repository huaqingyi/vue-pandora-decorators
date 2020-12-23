# Vue Pandora Decorators

* npm i vue-pandora-decorators --save
* yarn add vue-pandora-decorators

## 本插件基于 VUE 3.0 开发
* vuex 修饰器及 **Composition API** 支持
* 面向对象 **@Component** 支持 **[使用vue-class-component](https://github.com/vuejs/vue-class-component)**
* 本插件主要是用 Proxy 代理模式 代理 Vue Context

## 基础使用

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
        <div>{{ roles }}</div>
        <div>{{ computed }}</div>
        <el-button @click="() => test(['1', '2', '3'])">Test</el-button>
        <div>{{ testObj }}</div>
        <el-button @click="editObj">Action</el-button>
    </div>
    <router-view />
</template>
<script lang="ts">
import { useAction, useState } from 'vue-pandora-decorators';
import { Vue } from 'vue-class-component';
import { PermissionModule } from '../store/modules/permission';
import { Layout, LayoutState } from './store';

export default class extends Vue {

    public get roles() {
        return PermissionModule.roles;
    }

    public get computed() {
        return `${(new Date).getTime()}${(PermissionModule.roles).join('')}`;
    }

    public get test() {
        return PermissionModule.test;
    };

    public get testObj() {
        return useState<LayoutState>(Layout).testObj;
    }

    public get editObj() {
        return useAction(Layout).testAction;
    }

    constructor() {
        super(arguments);
        // console.log(this.roles);
    }
}
</script>
```

* 也可以这么使用 随便一个 vue 文件
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

### 在最后感谢一下 vuex-module-decorators
### 在最后感谢一下 vue-class-component
* 这里偷懒直接使用大佬的 库 十分感谢
* 后续迭代更多 需要支持的 API
* 最后再提一嘴 VUE 3.0 深入理解后确实不错 一开始看到 这意大利面条真心没胃口 
* 但经过思想斗争后 开始 开发这个插件 写到后面发现 面向对象与 Composition API 可以擦出别样的火花
* 感谢尤大大
* 请根据自己喜好食用 ✌️
