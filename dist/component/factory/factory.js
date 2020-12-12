"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const symbol_1 = require("../symbol");
class Factory {
    get proxyKey() {
        return symbol_1.PROXYKEY;
    }
    get dynamicKey() {
        return symbol_1.DYNAMICKEY;
    }
    get propsKey() {
        return symbol_1.PROPSKEY;
    }
    get stateKey() {
        return symbol_1.STATEKEY;
    }
    get computedKey() {
        return symbol_1.COMPUTEDKEY;
    }
    output(...props) {
        throw new Error('Method not implemented.');
    }
    isDynamic(target, prototypeKey) {
        return Reflect.getMetadata(this.dynamicKey, target, prototypeKey) || false;
    }
    isProps(target, prototypeKey) {
        return Reflect.getMetadata(this.propsKey, target, prototypeKey) || false;
    }
    isState(target, prototypeKey) {
        return (Reflect.getMetadata(this.stateKey, target, prototypeKey) || {}).isState || false;
    }
    stateEffect(target, prototypeKey) {
        return (Reflect.getMetadata(this.stateKey, target, prototypeKey) || {}).callback || false;
    }
    isComputed(target, prototypeKey) {
        return (Reflect.getMetadata(this.stateKey, target, prototypeKey) || {}).isComputed || false;
    }
    computedEffect(target, prototypeKey) {
        return (Reflect.getMetadata(this.computedKey, target, prototypeKey) || {}).callback || false;
    }
}
exports.Factory = Factory;

//# sourceMappingURL=../../sourcemaps/component/factory/factory.js.map
