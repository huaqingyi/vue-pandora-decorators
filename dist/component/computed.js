"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = void 0;
const symbol_1 = require("./symbol");
function computed(target, key, descriptor) {
    Reflect.defineMetadata(symbol_1.COMPUTEDKEY, { isComputed: true, callback: descriptor.get }, target, key);
}
exports.computed = computed;

//# sourceMappingURL=../sourcemaps/component/computed.js.map
