import { PureComponent, PureComponentClass } from '../component';
import { Factory } from './factory';
export declare class ContextFactory extends Factory {
    setupData: any;
    target: PureComponentClass<PureComponent>;
    comp: PureComponent;
    private store;
    constructor(setupData: any, target: PureComponentClass<PureComponent>, comp: PureComponent);
    output<T = any>(): T;
}
