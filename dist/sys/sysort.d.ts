import { AxiosRequestConfig, AxiosInstance } from 'axios';
import { ComponentConfiguration } from 'jz-component-types';
import { DefineComponent } from 'vue';
export interface JZAsyncComponent {
    Config: ComponentConfiguration;
    Component: DefineComponent<{}, {}, any>;
}
export declare class Sysort {
    config: AxiosRequestConfig;
    static create(config?: AxiosRequestConfig): Sysort;
    http: AxiosInstance;
    get defaults(): AxiosRequestConfig;
    get interceptors(): {
        request: import("axios").AxiosInterceptorManager<AxiosRequestConfig>;
        response: import("axios").AxiosInterceptorManager<import("axios").AxiosResponse<any>>;
    };
    get getUri(): (config?: AxiosRequestConfig | undefined) => string;
    get request(): <T = any, R = import("axios").AxiosResponse<T>>(config: AxiosRequestConfig) => Promise<R>;
    get get(): <T = any, R = import("axios").AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined) => Promise<R>;
    get delete(): <T = any, R = import("axios").AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined) => Promise<R>;
    get head(): <T = any, R = import("axios").AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined) => Promise<R>;
    get options(): <T = any, R = import("axios").AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined) => Promise<R>;
    get post(): <T = any, R = import("axios").AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<R>;
    get put(): <T = any, R = import("axios").AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<R>;
    get patch(): <T = any, R = import("axios").AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<R>;
    private _modules;
    get modules(): {
        [url: string]: any;
    };
    constructor(config?: AxiosRequestConfig);
    protected webpack<T = JZAsyncComponent>(url: string, config?: AxiosRequestConfig): Promise<T>;
    protected other<T = JZAsyncComponent>(url: string, config?: AxiosRequestConfig): Promise<T>;
    import<T = JZAsyncComponent>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
