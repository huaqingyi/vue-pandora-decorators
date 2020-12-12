import { RouteRecordRaw } from 'vue-router';
import homeRouter from '/@/pages/home/router';
import decoratorRouter from '/@/pages/decorator/router';

export default [
    {
        path: '/',
        name: 'layout',
        component: import('./layout.vue'),
        redirect: '/decorator',
    },
    homeRouter,
    decoratorRouter,
] as RouteRecordRaw[];
