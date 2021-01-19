import { AxiosInstance } from 'axios';
// import { Ref } from 'vue';

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $http: AxiosInstance;
        $t: (translateKey: string) => string;
        $setRef: (callback: (t: this) => any & string) => any;
    }
}
