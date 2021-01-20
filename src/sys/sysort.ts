import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { ComponentConfiguration } from 'jz-component-types';
import { DefineComponent } from 'vue';

export interface JZAsyncComponent {
    Config: ComponentConfiguration;
    Component: DefineComponent<{}, {}, any>;
}

export class Sysort {
    public static create(config?: AxiosRequestConfig) {
        return new this(config);
    }

    public http: AxiosInstance;

    public get defaults() {
        return this.http.defaults;
    }

    public get interceptors() {
        return this.http.interceptors;
    }

    public get getUri() {
        return this.http.getUri;
    }

    public get request() {
        return this.http.request;
    }

    public get get() {
        return this.http.get;
    }

    public get delete() {
        return this.http.delete;
    }

    public get head() {
        return this.http.head;
    }

    public get options() {
        return this.http.options;
    }

    public get post() {
        return this.http.post;
    }

    public get put() {
        return this.http.put;
    }

    public get patch() {
        return this.http.patch;
    }

    private _modules: { [url: string]: any | JZAsyncComponent };

    public get modules() {
        return this._modules;
    }

    constructor(
        public config: AxiosRequestConfig = {}
    ) {
        this.http = Axios.create(config);
        this._modules = {};
    }

    protected async webpack<T = JZAsyncComponent>(url: string, config?: AxiosRequestConfig): Promise<T> {
        if (__webpack_require__.c[url]) { return __webpack_require__(url) };
        const pkg = await this.get(url, config).then(({ data }) => data);
        (__webpack_modules__ as any)[url] = function (module: any, __webpack_exports__: any, __webpack_require__: any) {
            const exports = eval(pkg);
            __webpack_require__.c[url] = {
                children: [], exports, i: url, l: true, parents: [],
            }
            return exports;
        };
        await (__webpack_modules__ as any)[url].call(module.exports, module, module.exports, __webpack_require__);
        const exports = await __webpack_require__(url);
        this._modules[url] = exports;
        return exports;
    }

    protected async other<T = JZAsyncComponent>(url: string, config?: AxiosRequestConfig): Promise<T> {
        if (this._modules[url]) { return this._modules[url]; }
        const pkg = await this.get(url, config).then(({ data }) => data);
        const exports = eval(pkg);
        this._modules[url] = exports;
        return exports;
    }

    public import<T = JZAsyncComponent>(url: string, config?: AxiosRequestConfig) {
        if (__webpack_require__) {
            return this.webpack<T>(url, config);
        }
        return this.other<T>(url, config);
    }

}
