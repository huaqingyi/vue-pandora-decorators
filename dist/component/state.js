"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const symbol_1 = require("./symbol");
function state(callback) {
    return (target, key) => {
        Reflect.defineMetadata(symbol_1.STATEKEY, { isState: true, callback }, target, key);
    };
}
exports.state = state;

//# sourceMappingURL=../sourcemaps/component/state.js.map
