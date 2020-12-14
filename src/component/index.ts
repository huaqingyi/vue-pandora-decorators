export * from 'vue-class-component';
import { ComponentOptions } from 'vue';
import { Options, Vue, VueConstructor, VueBase } from 'vue-class-component';

export function Component<VC extends VueConstructor<VueBase>>(target: VC): VC;
export function Component<V extends Vue>(options: ComponentOptions & ThisType<V>): <VC extends VueConstructor<VueBase>>(target: VC) => VC;
export function Component(props: any) {
    if (props.constructor && props.constructor === Vue.constructor) {
        Options({})(props);
        return props;
    } else {
        return <VC extends VueConstructor<VueBase>>(target: VC) => {
            Options(props)(target);
        }
    }
}
