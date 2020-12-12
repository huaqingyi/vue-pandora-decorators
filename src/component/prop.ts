import { PureComponent } from './component';
import { Prop as Pp } from 'vue';
import { isFunction } from 'lodash';
import { PROPSKEY } from './symbol';

export function Prop(target: PureComponent, key: string): void;
export function Prop<T, D = T>(options: Pp<T, D>): (target: PureComponent, key: string) => void;
export function Prop(props: any | PureComponent, key?: string) {
    if (key && props instanceof PureComponent && props._root && isFunction(props._root) && props._root() === PureComponent) {
        const aprops = props._props();
        aprops[key] = {};
        props._props = (() => aprops).bind(props);
        Object.defineProperty(props, key, {
            get() {
                return this.props[key];
            },
            set(value) {
                return this.props[key] = value;
            }
        });
        Reflect.defineMetadata(PROPSKEY, true, props, key);
    }
    return (target: PureComponent, akey: string) => {
        const aprops = target._props();
        aprops[akey] = props;
        target._props = (() => aprops).bind(target);
        Object.defineProperty(target, akey, {
            get() {
                return this.props[akey];
            },
            set(value) {
                return this.props[akey] = value;
            }
        });
        Reflect.defineMetadata(PROPSKEY, true, target, akey);
    }
}