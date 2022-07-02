import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/merchant/designer',
    name: 'merchant-designer',
    component: () => import('@/view/merchant/index.vue')
  }
];

export default routes;
