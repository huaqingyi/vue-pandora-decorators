import { PureComponent } from './component';
import { Prop as Pp } from 'vue';
export declare function Prop(target: PureComponent, key: string): void;
export declare function Prop<T, D = T>(options: Pp<T, D>): (target: PureComponent, key: string) => void;
