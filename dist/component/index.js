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
exports.Component = void 0;
__exportStar(require("vue-class-component"), exports);
const vue_class_component_1 = require("vue-class-component");
function Component(props) {
    if (props.constructor && props.constructor === vue_class_component_1.Vue.constructor) {
        vue_class_component_1.Options({})(props);
        return props;
    }
    else {
        return (target) => {
            vue_class_component_1.Options(props)(target);
        };
    }
}
exports.Component = Component;

//# sourceMappingURL=../sourcemaps/component/index.js.map
