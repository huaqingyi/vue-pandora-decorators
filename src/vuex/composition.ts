import { VuexModule, VuexModuleClass } from './model';
import { computed, ComputedRef } from 'vue';
import { map } from 'lodash';
import { ServiceClass } from './service';

type ComputedReadonly<T> = {
    readonly [P in keyof T]: ComputedRef<T[P]>;
};

export function useState<State>(module: VuexModuleClass<VuexModule>): State;
export function useState<State>(module: VuexModuleClass<VuexModule>, toComputed: true): ComputedReadonly<State>;
export function useState(module: VuexModuleClass<VuexModule>, toComputed?: true) {
    const state = (module.store.state as any)[module.id];
    return new Proxy(state, {
        get(target, key) {
            if (toComputed) {
                return computed(() => target[key]);
            } else {
                return target[key];
            }
        }
    });
}

export function useAction<M>(module: VuexModuleClass<M>): M {
    const store = module.store;
    return new Proxy<any>({}, {
        get(target, key: any) {
            if (module.actions && module.actions[key]) {
                return async (...props: any) => await store.dispatch(module.action((module) => module[key]), ...props);
            }
            return target[key];
        }
    })
}

export function useActions<M>(module: VuexModuleClass<M>): M {
    const store = module.store;
    const actions: any = {};
    map(module.actions, (_f, n) => {
        actions[n] = (...props: any) => store.dispatch(module.action((module) => module[n]), ...props)
    });
    return actions;
}

export function useCommit<M>(module: VuexModuleClass<M>): M {
    const store = module.store;
    return new Proxy<any>({}, {
        get(target, key: any) {
            if (module.mutations && module.mutations[key]) {
                return async (...props: any) => await store.commit(module.action((module) => module[key]), ...props);
            }
            return target[key];
        }
    })
}

export function useCommits<M>(module: VuexModuleClass<M>): M {
    const store = module.store;
    const mutations: any = {};
    map(module.mutations, (_f, n) => {
        mutations[n] = (...props: any) => store.commit(module.action((module) => module[n]), ...props)
    });
    return mutations;
}

export function useService<S>(Service: ServiceClass<S>): S {
    if (!Service.id) {
        (Service as any).id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
    }
    if (!Service.getService(Service.id)) { Service.setService(Service.id, new Service()); }
    return Service.getService(Service.id);
}
