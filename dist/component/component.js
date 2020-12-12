"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.PureComponentType = exports.PureComponent = void 0;
const lodash_1 = require("lodash");
const component_1 = require("./factory/component");
class PureComponent {
    constructor(props, ctx) {
        this.props = props;
    }
    static _root() {
        return PureComponent;
    }
    setup(props, ctx) {
        return this;
    }
    _root() {
        return PureComponent;
    }
    _props() {
        return {};
    }
}
exports.PureComponent = PureComponent;
class PureComponentType extends PureComponent {
}
exports.PureComponentType = PureComponentType;
function Component(props) {
    if (props._root && lodash_1.isFunction(props._root) && props._root() === PureComponent) {
        const proxy = new component_1.ComponentFactory(props);
        return proxy.output();
    }
    return (target) => {
        const proxy = new component_1.ComponentFactory(target, props);
        return proxy.output();
    };
}
exports.Component = Component;

//# sourceMappingURL=../sourcemaps/component/component.js.map
