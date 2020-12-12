"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextFactory = void 0;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const vuex_1 = require("vuex");
const factory_1 = require("./factory");
class ContextFactory extends factory_1.Factory {
    constructor(setupData, target, comp) {
        super();
        this.setupData = setupData;
        this.target = target;
        this.comp = comp;
        this.store = vuex_1.useStore();
    }
    output() {
        const Target = this.target;
        lodash_1.map(this.setupData, (o, k) => {
            if (k === this.proxyKey) {
                return o;
            }
            ;
            if (lodash_1.isString(k)) {
                if (this.isDynamic(Target.prototype, k)) {
                    if (lodash_1.isString(o) || lodash_1.isNumber(o) || lodash_1.isBoolean(o)) {
                        this.setupData[k] = vue_1.ref(this.setupData[k]);
                    }
                    else {
                        this.setupData[k] = vue_1.reactive(this.setupData[k]);
                    }
                    return o;
                }
                if (this.isState(Target.prototype, k)) {
                    const stateEffect = this.stateEffect(Target.prototype, k);
                    if (stateEffect && stateEffect instanceof Function) {
                        this.setupData[k] = vue_1.computed(stateEffect.bind(this.comp, this.store));
                    }
                    return o;
                }
                if (this.isComputed(Target.prototype, k)) {
                    const computedEffect = this.computedEffect(Target.prototype, k);
                    if (computedEffect && computedEffect instanceof Function) {
                        this.setupData[k] = vue_1.computed(computedEffect.bind(this.comp));
                    }
                    return o;
                }
                return o;
            }
        });
        return { ...this.setupData, [this.proxyKey]: this.comp };
    }
}
exports.ContextFactory = ContextFactory;

//# sourceMappingURL=../../sourcemaps/component/factory/context.js.map
