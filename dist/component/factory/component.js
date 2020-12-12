"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentFactory = exports.ProxyActions = void 0;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const component_1 = require("../component");
const context_1 = require("./context");
const factory_1 = require("./factory");
var ProxyActions;
(function (ProxyActions) {
    ProxyActions["RENDER"] = "render";
})(ProxyActions = exports.ProxyActions || (exports.ProxyActions = {}));
class ComponentFactory extends factory_1.Factory {
    constructor(target, options) {
        super();
        this.target = target;
        this.options = options;
    }
    isProxy(proxy) {
        return proxy && proxy._root && lodash_1.isFunction(proxy._root) && proxy._root() === component_1.PureComponent;
    }
    synchro(data) {
        if (vue_1.isRef(data))
            return data.value;
        return data;
    }
    proxyRender(ctx, proxy) {
        return new Proxy(ctx, {
            get: (target, key) => {
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
                return lodash_1.isFunction(proxy[key]) ? proxy[key].bind(proxy) : proxy[key];
            },
            set: (target, key, value) => {
                if (this.isProps(proxy, key)) {
                    return target.props[key] = value;
                }
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
    render(target, key, ctx, cache, $props, $setup, $data, $options) {
        const proxy = ctx[this.proxyKey];
        let useCtx = ctx;
        if (this.isProxy(proxy)) {
            useCtx = this.proxyRender(ctx, proxy);
        }
        if (!target[key]) {
            throw new Error(`${target} -> ${key} of undefined ...`);
        }
        return target[key].apply(this, [useCtx, cache, $props, $setup, $data, $options]);
    }
    output() {
        const Target = this.target;
        Target.prototype.state = {};
        const props = lodash_1.extend(this.options ? this.options.props || {} : {}, Target.prototype._props());
        const component = new Proxy(vue_1.defineComponent({
            ...this.options ? this.options : {},
            props,
            setup: (...args) => {
                const comp = new Target(...args);
                const { onReactived, reactived, didReactived } = comp;
                onReactived && onReactived();
                let setupData = comp.setup(...args);
                if (!setupData) {
                    setupData = { ...comp };
                }
                else {
                    setupData = { ...setupData };
                }
                reactived && reactived(setupData);
                const context = new context_1.ContextFactory(setupData, Target, comp);
                let proxyFatory = context.output();
                if (didReactived) {
                    const nproxyFatory = didReactived(proxyFatory);
                    if (nproxyFatory)
                        proxyFatory = nproxyFatory;
                }
                return proxyFatory;
            },
        }), {
            get: (target, key) => {
                switch (key) {
                    case ProxyActions.RENDER:
                        if (!this.isRender) {
                            this.isRender = true;
                            return (ctx, cache, $props, $setup, $data, $options) => {
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
exports.ComponentFactory = ComponentFactory;

//# sourceMappingURL=../../sourcemaps/component/factory/component.js.map
