import { RouteRecordRaw } from 'vue-router';
import Layout from '/@/layout/layout.vue';

export default {
    path: '/decorator',
    name: 'decorator',
    component: Layout,
    redirect: '/decorator/index',
    children: [
        {
            path: 'index',
            name: 'index',
            component: () => import('/@/pages/decorator/decorator.vue'),
        }
    ],
} as RouteRecordRaw;
