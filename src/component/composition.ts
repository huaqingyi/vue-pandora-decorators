import { PureComponent, PureComponentClass } from './component';

/**
 * get prototype to don't 'new' as before type .
 * @param preClass @Component decorator component factory proxy object .
 */
export function Mixin<C extends PureComponentClass<PureComponent>>(preClass: C): C {
    return preClass._class();
}
