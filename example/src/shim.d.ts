declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: any & DefineComponent;
    export default component;
}
