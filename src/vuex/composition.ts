import { VuexModule, VuexModuleClass } from './model';
import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';
import { map } from 'lodash';

type ComputedReadonly<T> = {
    readonly [P in keyof T]: ComputedRef<T[P]>;
};

export function useState<State>(module: VuexModuleClass<VuexModule>, isDecorator: true): <T>() => T;
export function useState<State>(module: VuexModuleClass<VuexModule>): ComputedReadonly<State>;
export function useState<State>(module: VuexModuleClass<VuexModule>, isDecorator?: true) {
    const state = useStore().state[module.id];
    return new Proxy(state, {
        get(target, key) {
            if (!isDecorator) {
                return computed(() => target[key]);
            } else {
                return () => target[key];
            }
        }
    });
}

export function useAction<M>(module: VuexModuleClass<M>): M {
    const store = useStore();
    return new Proxy<any>({}, {
        get(target, key: any) {
            if (module.actions && module.actions[key]) {
                return (...props: any) => store.dispatch(module.action((module) => module[key]), ...props);
            }
            return target[key];
        }
    })
}

export function useActions<M>(module: VuexModuleClass<M>): M {
    const store = useStore();
    const actions: any = {};
    map(module.actions, (_f, n) => {
        actions[n] = (...props: any) => store.dispatch(module.action((module) => module[n]), ...props)
    });
    return actions;
}
