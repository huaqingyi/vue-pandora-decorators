export * from 'vuex-module-decorators';
import { VuexModule as VxModule } from 'vuex-module-decorators';
import { Module as Mod, Store } from 'vuex';
import { Service } from './service';
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';
export declare class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    static id: string;
    static keys: {
        [x: string]: string;
    };
    static _root(): typeof VuexModule;
    static action(callback: (model: any & VuexModule) => Function): string;
}
export declare type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
export declare type VuexModuleClass<V> = (new (...args: any[]) => V & VuexModule) & typeof VuexModule;
export declare function Module<S>(module: Function & Mod<S, any>): ClassDecorator;
export declare function Module<S>(options: ModuleOptions): ClassDecorator;
export declare function Module<S>(options: {
    store: Store<any>;
}): ClassDecorator;
