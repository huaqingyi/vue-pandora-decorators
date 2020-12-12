import { PureComponent } from '../component';
import { STATEKEY, DYNAMICKEY, PROPSKEY, PROXYKEY, COMPUTEDKEY } from '../symbol';

export interface FactoryBase {
    output<T>(...props: any): T;
    isDynamic(target: PureComponent, prototypeKey: string): boolean;
}

export class Factory implements FactoryBase {

    public get proxyKey() {
        return PROXYKEY;
    }

    public get dynamicKey() {
        return DYNAMICKEY;
    }

    public get propsKey() {
        return PROPSKEY;
    }

    public get stateKey() {
        return STATEKEY;
    }

    public get computedKey() {
        return COMPUTEDKEY;
    }

    public output<T>(...props: any): T {
        throw new Error('Method not implemented.');
    }

    public isDynamic(target: PureComponent, prototypeKey: string): boolean {
        return Reflect.getMetadata(this.dynamicKey, target, prototypeKey) || false;
    }

    public isProps(target: PureComponent, prototypeKey: string): boolean {
        return Reflect.getMetadata(this.propsKey, target, prototypeKey) || false;
    }

    public isState(target: PureComponent, prototypeKey: string): boolean {
        return (Reflect.getMetadata(this.stateKey, target, prototypeKey) || {}).isState || false;
    }

    public stateEffect(target: PureComponent, prototypeKey: string) {
        return (Reflect.getMetadata(this.stateKey, target, prototypeKey) || {}).callback || false;
    }

    public isComputed(target: PureComponent, prototypeKey: string): boolean {
        return (Reflect.getMetadata(this.stateKey, target, prototypeKey) || {}).isComputed || false;
    }

    public computedEffect(target: PureComponent, prototypeKey: string) {
        return (Reflect.getMetadata(this.computedKey, target, prototypeKey) || {}).callback || false;
    }
}