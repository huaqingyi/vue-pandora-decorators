import { PureComponent } from './component';
import { COMPUTEDKEY } from './symbol';

export interface ComputedConfig {
    isComputed?: true,
    callback: Function;
}

/**
 * setup vue reactive to vue component .
 * @param target @Component decorator vue component class .
 * @param key component class prototype key .
 */
export function computed(target: PureComponent, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(COMPUTEDKEY, { isComputed: true, callback: descriptor.get }, target, key);
}