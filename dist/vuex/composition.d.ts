import { VuexModule, VuexModuleClass } from './model';
import { ComputedRef } from 'vue';
declare type ComputedReadonly<T> = {
    readonly [P in keyof T]: ComputedRef<T[P]>;
};
export declare function useState<State>(module: VuexModuleClass<VuexModule>): State;
export declare function useState<State>(module: VuexModuleClass<VuexModule>, toComputed: true): ComputedReadonly<State>;
export declare function useAction<M>(module: VuexModuleClass<M>): M;
export declare function useActions<M>(module: VuexModuleClass<M>): M;
export {};
