import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/compile',
    name: 'merchant',
    component: () => import('@/view/merchant/index.vue')
  }
];

export default routes;
