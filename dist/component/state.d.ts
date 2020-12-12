import { Store } from 'vuex';
export interface StateConfig {
    isState?: true;
    callback: <S>(store?: Store<S>) => any;
}
export declare function state(callback: <S>(store?: Store<S>) => any): PropertyDecorator;
