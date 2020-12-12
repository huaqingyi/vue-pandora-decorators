import { PureComponent } from './component';
export interface ComputedConfig {
    isComputed?: true;
    callback: Function;
}
export declare function computed(target: PureComponent, key: string, descriptor: PropertyDescriptor): void;
