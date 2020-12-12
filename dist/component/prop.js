"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prop = void 0;
const component_1 = require("./component");
const lodash_1 = require("lodash");
const symbol_1 = require("./symbol");
function Prop(props, key) {
    if (key && props instanceof component_1.PureComponent && props._root && lodash_1.isFunction(props._root) && props._root() === component_1.PureComponent) {
        const aprops = props._props();
        aprops[key] = {};
        props._props = (() => aprops).bind(props);
        Object.defineProperty(props, key, {
            get() {
                return this.props[key];
            },
            set(value) {
                return this.props[key] = value;
            }
        });
        Reflect.defineMetadata(symbol_1.PROPSKEY, true, props, key);
    }
    return (target, akey) => {
        const aprops = target._props();
        aprops[akey] = props;
        target._props = (() => aprops).bind(target);
        Object.defineProperty(target, akey, {
            get() {
                return this.props[akey];
            },
            set(value) {
                return this.props[akey] = value;
            }
        });
        Reflect.defineMetadata(symbol_1.PROPSKEY, true, target, akey);
    };
}
exports.Prop = Prop;

//# sourceMappingURL=../sourcemaps/component/prop.js.map
