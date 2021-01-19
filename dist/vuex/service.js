"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useService = exports.Service = exports._service = void 0;
exports._service = {};
class Service {
    static get _service() {
        return exports._service;
    }
    static getService(id) {
        return exports._service[id];
    }
    static _root() {
        return Service;
    }
}
exports.Service = Service;
function useService(Service) {
    if (!Service.id) {
        Service.id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
    }
    if (!exports._service[Service.id]) {
        exports._service[Service.id] = new Service();
    }
    return Service.getService(Service.id);
}
exports.useService = useService;

//# sourceMappingURL=../sourcemaps/vuex/service.js.map
