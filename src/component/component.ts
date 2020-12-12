import { isFunction } from 'lodash';
import {
    ComponentOptionsBase, ComputedOptions, MethodOptions,
    ComponentOptionsMixin, EmitsOptions, SetupContext, ComputedRef, ComponentObjectPropsOptions
} from 'vue';
import { ComponentFactory } from './factory/component';

type ProxySetupData<T> = {
    [P in keyof T]: ComputedRef<T[P]>;
};

/**
 * static class .
 * static _root is extends root class type, it's enum for facotry .
 * _root same as above .
 * setup is init data and handles hook, this's same to vue defineComponent setup .
 */
export class PureComponent<
    Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any,
    Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any,
    E extends EmitsOptions = any, EE extends string = string, Defaults = {}
    > implements ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> {

    public static _class: <C extends PureComponentClass<PureComponent>>() => C;

    public static _root() {
        return PureComponent;
    }

    public state!: ProxySetupData<RawBindings> | ProxySetupData<this>;
    public props: Props;

    constructor(props: Props, ctx: SetupContext<E>) {
        this.props = props;
    }

    public setup(props: Props, ctx: SetupContext<E>) {
        return this as any;
    }

    public _root() {
        return PureComponent;
    }

    public _props(): ComponentObjectPropsOptions<Props> {
        return {} as ComponentObjectPropsOptions<Props>;
    }
}

/**
 * base class ts type the limit .
 */
export class PureComponentType extends PureComponent<any, any, any, any, any, any, any, any, any, any>{ }
export type PureComponentClass<
    V, Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any,
    Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any,
    E extends EmitsOptions = any, EE extends string = string, Defaults = {}
    > = (new (...args: any[]) => V & PureComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults>) & typeof PureComponentType;

/**
 * Factory vue render ctx and class Proxy Object output .
 * @param target @Component decorator of vue component class .
 */
export function Component<C extends PureComponentClass<PureComponent>>(target: C): C;
export function Component<
    Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any,
    Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any,
    E extends EmitsOptions = any, EE extends string = string, Defaults = {}
>(
    props: ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults>
): <C extends PureComponentClass<PureComponent>>(target: C) => C;
export function Component(props: any) {
    if (props._root && isFunction(props._root) && props._root() === PureComponent) {
        const proxy = new ComponentFactory(props);
        return proxy.output();
    }
    return <C extends PureComponentClass<PureComponent>>(target: C) => {
        const proxy = new ComponentFactory(target, props);
        return proxy.output();
    }
}
