import { VuexModule, Module, Action, Mutation, getModule } from 'vue-pandora-decorator';
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

