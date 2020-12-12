import { isBoolean, isNumber, isString, map } from 'lodash';
import { ref, reactive, computed } from 'vue';
import { useStore, Store } from 'vuex';
import { PureComponent, PureComponentClass } from '../component';
import { Factory } from './factory';

export class ContextFactory extends Factory {

    private store: Store<any>;

    constructor(
        public setupData: any,
        public target: PureComponentClass<PureComponent>,
        public comp: PureComponent,
    ) {
        super();
        this.store = useStore();
    }

    public output<T = any>(): T {
        const Target = this.target;
        map(this.setupData, (o, k: string | Symbol) => {
            if (k === this.proxyKey) { return o };
            if (isString(k)) {
                // reactived data is truer ?
                if (this.isDynamic(Target.prototype, k)) {
                    if (isString(o) || isNumber(o) || isBoolean(o)) {
                        this.setupData[k] = ref(this.setupData[k]);
                    } else {
                        this.setupData[k] = reactive(this.setupData[k]);
                    }
                    return o;
                } 
                
                if (this.isState(Target.prototype, k)) {
                    const stateEffect = this.stateEffect(Target.prototype, k);
                    if (stateEffect && stateEffect instanceof Function) {
                        this.setupData[k] = computed(stateEffect.bind(this.comp, this.store));
                    }
                    return o;
                } 
                
                if (this.isComputed(Target.prototype, k)) {
                    const computedEffect = this.computedEffect(Target.prototype, k);
                    if (computedEffect && computedEffect instanceof Function) {
                        this.setupData[k] = computed(computedEffect.bind(this.comp));
                    }
                    return o;
                }
                return o;
            }
        });
        return { ...this.setupData, [this.proxyKey]: this.comp };
    }
}
