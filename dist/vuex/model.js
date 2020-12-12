"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.VuexModule = void 0;
__exportStar(require("vuex-module-decorators"), exports);
const vuex_module_decorators_1 = require("vuex-module-decorators");
const lodash_1 = require("lodash");
class VuexModule extends vuex_module_decorators_1.VuexModule {
    static _root() {
        return VuexModule;
    }
    static action(callback) {
        return `${this.id}/${callback(this.keys)}`;
    }
}
exports.VuexModule = VuexModule;
function createdModel(module) {
    if (!module.id) {
        module.id = Number(Math.random().toString().substring(3, 10) +
            Date.now()).toString(36);
    }
    module.keys = {};
    lodash_1.map(lodash_1.merge({}, module.actions, module.mutations, module.getters), (o, i) => {
        module.keys[i] = i;
    });
    return module;
}
function Module(options) {
    if (options._root && lodash_1.isFunction(options._root) && options._root() === VuexModule) {
        return vuex_module_decorators_1.Module({ namespaced: true, name: options.id })(createdModel(options));
    }
    else {
        return (target) => {
            const store = options.store;
            const module = createdModel(target);
            store.registerModule(module.id, vuex_module_decorators_1.Module({ namespaced: true, ...options })(module));
        };
    }
}
exports.Module = Module;

//# sourceMappingURL=../sourcemaps/vuex/model.js.map
