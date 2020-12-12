import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '/@/store';

export interface SettingState {
}

@Module({ dynamic: true, store, name: 'setting' })
class Setting extends VuexModule implements SettingState {

    constructor(props: any) {
        super(props);
        // this.routes = constantRoutes.concat(asyncRoutes);
        // this.dynamicRoutes = asyncRoutes;
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

export const SettingModule = getModule(Setting);