import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '/@/store';

export interface UserState {
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {

    constructor(props: any) {
        super(props);
        // this.routes = constantRoutes.concat(asyncRoutes);
        // this.dynamicRoutes = asyncRoutes;
    }

    // @Action
    // public generateRoutes(roles: string[]) {
    //     let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    //     this.UserRoutes(accessedRoutes);
    // }

    // @Mutation
    // private UserRoutes(routes: RouteConfig[]) {
    //     this.routes = constantRoutes.concat(routes);
    //     this.dynamicRoutes = routes;
    // }
}

export const UserModule = getModule(User);