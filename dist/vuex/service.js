"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports._service = void 0;
exports._service = {};
class Service {
    static get _service() {
        return exports._service;
    }
    static setService(id, service) {
        return exports._service[id] = service;
    }
    static getService(id) {
        return exports._service[id];
    }
    static _root() {
        return Service;
    }
}
exports.Service = Service;

//# sourceMappingURL=../sourcemaps/vuex/service.js.map
