export * from 'vue-class-component';
import { ComponentOptions } from 'vue';
import { Vue, VueConstructor, VueBase } from 'vue-class-component';
export declare function Component<VC extends VueConstructor<VueBase>>(target: VC): VC;
export declare function Component<V extends Vue>(options: ComponentOptions & ThisType<V>): <VC extends VueConstructor<VueBase>>(target: VC) => VC;
