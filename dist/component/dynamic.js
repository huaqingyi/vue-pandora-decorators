"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
const symbol_1 = require("./symbol");
function dynamic(target, key) {
    Reflect.defineMetadata(symbol_1.DYNAMICKEY, true, target, key);
}
exports.dynamic = dynamic;

//# sourceMappingURL=../sourcemaps/component/dynamic.js.map
