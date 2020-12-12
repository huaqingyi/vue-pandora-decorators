import { Ref, UnwrapRef, ComputedRef } from 'vue';
export declare type ToRectiveds<T = any> = {
    [K in keyof T]: T[K] extends Ref ? T[K] : (Ref<UnwrapRef<T[K]>> | ComputedRef<T[K]> | Readonly<Ref<T[K]>>);
};
export interface Reactived<T = any> {
    onReactived?: () => void;
    reactived?: (data: ToRectiveds<T>) => ToRectiveds<T> | void;
    didReactived?: (proxy: ToRectiveds<T>) => ToRectiveds<T> | void;
}
