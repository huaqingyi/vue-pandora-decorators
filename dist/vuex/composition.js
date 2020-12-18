"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActions = exports.useAction = exports.useState = void 0;
const vue_1 = require("vue");
const lodash_1 = require("lodash");
function useState(module, toComputed) {
    const state = module.store.state[module.id];
    return new Proxy(state, {
        get(target, key) {
            if (toComputed) {
                return vue_1.computed(() => target[key]);
            }
            else {
                return target[key];
            }
        }
    });
}
exports.useState = useState;
function useAction(module) {
    const store = module.store;
    return new Proxy({}, {
        get(target, key) {
            if (module.actions && module.actions[key]) {
                return async (...props) => await store.dispatch(module.action((module) => module[key]), ...props);
            }
            return target[key];
        }
    });
}
exports.useAction = useAction;
function useActions(module) {
    const store = module.store;
    const actions = {};
    lodash_1.map(module.actions, (_f, n) => {
        actions[n] = (...props) => store.dispatch(module.action((module) => module[n]), ...props);
    });
    return actions;
}
exports.useActions = useActions;

//# sourceMappingURL=../sourcemaps/vuex/composition.js.map
