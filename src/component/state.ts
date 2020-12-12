import { Store } from 'vuex';
import { PureComponent } from './component';
import { STATEKEY } from './symbol';

export interface StateConfig {
    isState?: true,
    callback: <S>(store?: Store<S>) => any;
}

/**
 * setup vue reactive to vue component .
 * @param target @Component decorator vue component class .
 * @param key component class prototype key .
 */
export function state(callback: <S>(store?: Store<S>) => any): PropertyDecorator {
    return (target: any & PureComponent, key: string | Symbol) => {
        Reflect.defineMetadata(STATEKEY, { isState: true, callback }, target, key as string);
    }
}