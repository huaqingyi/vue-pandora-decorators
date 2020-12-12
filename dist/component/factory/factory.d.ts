import { PureComponent } from '../component';
export interface FactoryBase {
    output<T>(...props: any): T;
    isDynamic(target: PureComponent, prototypeKey: string): boolean;
}
export declare class Factory implements FactoryBase {
    get proxyKey(): symbol;
    get dynamicKey(): symbol;
    get propsKey(): symbol;
    get stateKey(): symbol;
    get computedKey(): symbol;
    output<T>(...props: any): T;
    isDynamic(target: PureComponent, prototypeKey: string): boolean;
    isProps(target: PureComponent, prototypeKey: string): boolean;
    isState(target: PureComponent, prototypeKey: string): boolean;
    stateEffect(target: PureComponent, prototypeKey: string): any;
    isComputed(target: PureComponent, prototypeKey: string): boolean;
    computedEffect(target: PureComponent, prototypeKey: string): any;
}
