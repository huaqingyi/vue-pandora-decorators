import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routers from '/@/layout/router';

const routes: RouteRecordRaw[] = [
    {
        path: '/404',
        component: () => import('/@/pages/error-page/404.vue'),
    },
    {
        path: '/401',
        component: () => import('/@/pages/error-page/401.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('/@/pages/error-page/404.vue'),
    },
];

export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

routers.map((r) => router.addRoute(r));
