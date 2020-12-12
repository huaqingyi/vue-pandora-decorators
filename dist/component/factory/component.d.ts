import { ComponentOptionsBase, ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, ComputedRef } from 'vue';
import { PureComponent, PureComponentClass } from '../component';
import { Factory } from './factory';
declare type FactoryContextDataInfo = string | number | boolean | object | Function | {} | [];
export interface FactoryContextData {
    [x: string]: FactoryContextDataInfo | Array<FactoryContextData> | Promise<FactoryContextDataInfo> | ComputedRef<FactoryContextData> | FactoryContextData | Promise<FactoryContextData>;
}
export declare enum ProxyActions {
    RENDER = "render"
}
export declare class ComponentFactory<CC extends PureComponentClass<PureComponent>, Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any, Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any, E extends EmitsOptions = any, EE extends string = string, Defaults = {}> extends Factory {
    target: CC;
    options?: ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> | undefined;
    isRender?: boolean;
    constructor(target: CC, options?: ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> | undefined);
    private isProxy;
    private synchro;
    private proxyRender;
    render(target: any, key: string, ctx: FactoryContextData & any, cache: any, $props: any, $setup: any, $data: any, $options: any): any;
    output(): any;
}
export {};
