import { ComponentOptionsBase, ComputedOptions, MethodOptions, ComponentOptionsMixin, EmitsOptions, SetupContext, ComputedRef, ComponentObjectPropsOptions } from 'vue';
declare type ProxySetupData<T> = {
    [P in keyof T]: ComputedRef<T[P]>;
};
export declare class PureComponent<Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any, Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any, E extends EmitsOptions = any, EE extends string = string, Defaults = {}> implements ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> {
    static _class: <C extends PureComponentClass<PureComponent>>() => C;
    static _root(): typeof PureComponent;
    state: ProxySetupData<RawBindings> | ProxySetupData<this>;
    props: Props;
    constructor(props: Props, ctx: SetupContext<E>);
    setup(props: Props, ctx: SetupContext<E>): any;
    _root(): typeof PureComponent;
    _props(): ComponentObjectPropsOptions<Props>;
}
export declare class PureComponentType extends PureComponent<any, any, any, any, any, any, any, any, any, any> {
}
export declare type PureComponentClass<V, Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any, Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any, E extends EmitsOptions = any, EE extends string = string, Defaults = {}> = (new (...args: any[]) => V & PureComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults>) & typeof PureComponentType;
export declare function Component<C extends PureComponentClass<PureComponent>>(target: C): C;
export declare function Component<Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any, Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any, E extends EmitsOptions = any, EE extends string = string, Defaults = {}>(props: ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults>): <C extends PureComponentClass<PureComponent>>(target: C) => C;
export {};
