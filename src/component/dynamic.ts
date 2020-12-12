import { PureComponent } from './component';
import { DYNAMICKEY } from './symbol';

/**
 * setup vue reactive to vue component .
 * @param target @Component decorator vue component class .
 * @param key component class prototype key .
 */
export function dynamic(target: PureComponent, key: string) {
    Reflect.defineMetadata(DYNAMICKEY, true, target, key);
}