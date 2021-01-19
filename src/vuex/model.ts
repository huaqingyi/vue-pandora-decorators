export * from 'vuex-module-decorators';
import { VuexModule as VxModule, Module as VModule } from 'vuex-module-decorators';
import { Module as Mod, Store } from 'vuex';
import { isFunction, map, merge } from 'lodash';
import { Service } from './service';
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';

export class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    public static id: string;
    public static keys: { [x: string]: string };
    public static readonly store: Store<ThisType<any>>;
    public static _root() {
        return VuexModule;
    }
    // tslint:disable-next-line:ban-types
    public static action(callback: (model: any & VuexModule) => Function) {
        return `${this.id}/${callback(this.keys)}`;
    }
}

export type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
export type VuexModuleClass<V> = (new (...args: any[]) => V & VuexModule) & typeof VuexModule;

function createdModel<S>(module: Mod<S, any>): any {
    if (!(module as any).id) {
        (module as any).id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
    }
    (module as any).keys = {};
    map(merge({}, module.actions, module.mutations, module.getters), (o, i) => {
        (module as any).keys[i] = i;
    });
    return module;
}

// tslint:disable-next-line:ban-types
export function Module<S>(module: Function & Mod<S, any>): ClassDecorator;
export function Module<S>(options: ModuleOptions): ClassDecorator;
export function Module<S>(options: { store: Store<any> }): ClassDecorator;
export function Module(options: any): any {
    if (options._root && isFunction(options._root) && options._root() === VuexModule) {
        return VModule({ namespaced: true, name: options.id })(createdModel(options));
    } else {
        return (target: VuexModuleClass<VuexModule>) => {
            const store: Store<any> = options.store;
            Object.defineProperty(target, 'store', {
                get() {
                    return store;
                }
            });
            const module = createdModel(target);

            store.registerModule(module.id, VModule({ namespaced: true, ...options } as ModuleOptions)(module));
        }
    }
}
