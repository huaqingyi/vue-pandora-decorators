import { RouteRecordRaw } from 'vue-router';
import Layout from '/@/layout/layout.vue';

export default {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home/index',
    children: [
        {
            path: 'index',
            name: 'index',
            component: () => import('/@/pages/home/home.vue'),
        }
    ],
} as RouteRecordRaw;
