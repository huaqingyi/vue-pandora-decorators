import { extend, isFunction } from 'lodash';
import {
    ComponentOptionsBase, ComponentOptionsMixin, ComputedOptions, defineComponent,
    EmitsOptions, MethodOptions, ComputedRef, isRef, Ref
} from 'vue';
import { PureComponent, PureComponentClass } from '../component';
import { ContextFactory } from './context';
import { Factory } from './factory';

/*
 * @FilePath: /vue3-template/src/libs/decorators/component/factory/component.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-11 10:06:14
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-11 17:27:33
 * @debugger: 
 */
type FactoryContextDataInfo = string | number | boolean | object | Function | {} | [];

export interface FactoryContextData {
    [x: string]: FactoryContextDataInfo | Array<FactoryContextData> | Promise<FactoryContextDataInfo> | ComputedRef<FactoryContextData> | FactoryContextData | Promise<FactoryContextData>;
}

export enum ProxyActions {
    RENDER = 'render',
}

export class ComponentFactory<
    CC extends PureComponentClass<PureComponent>,
    Props = any, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any,
    Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any,
    E extends EmitsOptions = any, EE extends string = string, Defaults = {}
    > extends Factory {

    public isRender?: boolean;

    constructor(
        public target: CC,
        public options?: ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults>,
    ) {
        super();
    }

    private isProxy(proxy: any & PureComponent) {
        return proxy && proxy._root && isFunction(proxy._root) && proxy._root() === PureComponent;
    }

    private synchro(data: any | Ref<any>) {
        if (isRef(data)) return data.value;
        return data;
    }

    private proxyRender(ctx: FactoryContextData & any, proxy: any & PureComponent) {
        return new Proxy(ctx, {
            get: (target, key: string) => {
                if (this.isProps(proxy, key)) {
                    return target.props[key];
                }
                if (this.isDynamic(proxy, key)) {
                    proxy[key] = this.synchro(target[key]);
                    return target[key];
                }
                if (this.isComputed(proxy, key)) {
                    proxy[key] = this.synchro(target[key]);
                    return target[key];
                }
                if (this.isState(proxy, key)) {
                    proxy[key] = this.synchro(target[key]);
                    return target[key];
                }
                return isFunction(proxy[key]) ? proxy[key].bind(proxy) : proxy[key];
            },
            set: (target, key: string, value) => {
                if (this.isProps(proxy, key)) { return target.props[key] = value; }

                if (this.isDynamic(proxy, key)) {
                    target[key] = value;
                    return true;
                }

                if (this.isComputed(proxy, key)) {
                    return true;
                }

                if (this.isState(proxy, key)) {
                    return true;
                }

                proxy[key] = value;

                return true;
            }
        });
    }

    public render(
        target: any, key: string,
        ctx: FactoryContextData & any, cache: any,
        $props: any, $setup: any, $data: any, $options: any,
    ) {
        const proxy = ctx[this.proxyKey];
        let useCtx = ctx;
        if (this.isProxy(proxy)) {
            useCtx = this.proxyRender(ctx, proxy);
        }
        if (!target[key]) { throw new Error(`${target} -> ${key} of undefined ...`); }
        return target[key].apply(this, [useCtx, cache, $props, $setup, $data, $options]);
    }

    public output() {
        const Target = this.target;
        Target.prototype.state = {};
        const props = extend(this.options ? this.options.props || {} : {}, Target.prototype._props());
        // console.log(props);
        const component = new Proxy<any>(defineComponent({
            ...this.options ? this.options : {},
            props,
            setup: (...args) => {
                // initialization @component decorator class with of setup hook .
                const comp = new Target(...args);
                // initialization reactived data hooks .
                const { onReactived, reactived, didReactived }: any = comp;
                // startup, this's before the setup .
                onReactived && onReactived();
                let setupData = comp.setup(...args);
                if (!setupData) { setupData = { ...comp }; }
                else { setupData = { ...setupData }; }
                // setup return context data .
                reactived && reactived(setupData);
                // proxy to fatory, fatory is merge ctx typeof proxy .
                const context = new ContextFactory(setupData, Target, comp);
                let proxyFatory = context.output<FactoryContextData>();
                // did reactived ...
                if (didReactived) {
                    const nproxyFatory = didReactived(proxyFatory);
                    if (nproxyFatory) proxyFatory = nproxyFatory;
                }
                return proxyFatory;
            },
        }), {
            get: (target, key: string) => {
                switch (key) {
                    case ProxyActions.RENDER:
                        if (!this.isRender) {
                            this.isRender = true;
                            return (ctx: any, cache: any, $props: any, $setup: any, $data: any, $options: any) => {
                                return this.render(target, key, ctx, cache, $props, $setup, $data, $options);
                            };
                        }
                        return target[key];
                    default: return target[key];
                }
            }
        });
        component._class = () => Target;
        return component;
    }
}
