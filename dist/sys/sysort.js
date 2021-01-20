"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sysort = void 0;
const axios_1 = __importDefault(require("axios"));
class Sysort {
    constructor(config = {}) {
        this.config = config;
        this.http = axios_1.default.create(config);
        this._modules = {};
    }
    static create(config) {
        return new this(config);
    }
    get defaults() {
        return this.http.defaults;
    }
    get interceptors() {
        return this.http.interceptors;
    }
    get getUri() {
        return this.http.getUri;
    }
    get request() {
        return this.http.request;
    }
    get get() {
        return this.http.get;
    }
    get delete() {
        return this.http.delete;
    }
    get head() {
        return this.http.head;
    }
    get options() {
        return this.http.options;
    }
    get post() {
        return this.http.post;
    }
    get put() {
        return this.http.put;
    }
    get patch() {
        return this.http.patch;
    }
    get modules() {
        return this._modules;
    }
    async webpack(url, config) {
        if (__webpack_require__.c[url]) {
            return __webpack_require__(url);
        }
        ;
        const pkg = await this.get(url, config).then(({ data }) => data);
        __webpack_modules__[url] = function (module, __webpack_exports__, __webpack_require__) {
            const exports = eval(pkg);
            __webpack_require__.c[url] = {
                children: [], exports, i: url, l: true, parents: [],
            };
            return exports;
        };
        await __webpack_modules__[url].call(module.exports, module, module.exports, __webpack_require__);
        const exports = await __webpack_require__(url);
        this._modules[url] = exports;
        return exports;
    }
    async other(url, config) {
        if (this._modules[url]) {
            return this._modules[url];
        }
        const pkg = await this.get(url, config).then(({ data }) => data);
        const exports = eval(pkg);
        this._modules[url] = exports;
        return exports;
    }
    import(url, config) {
        if (__webpack_require__) {
            return this.webpack(url, config);
        }
        return this.other(url, config);
    }
}
exports.Sysort = Sysort;

//# sourceMappingURL=../sourcemaps/sys/sysort.js.map
