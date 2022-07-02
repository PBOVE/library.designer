import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT_COMPONENT } from '../constant';

const modulesRouters = import.meta.globEager('./modules/**.ts');

// 主框架根路由
const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root-router',
  component: DEFAULT_LAYOUT_COMPONENT,
  children: Object.values(modulesRouters)
    .map((module) => module.default)
    .flat(1)
};

export const basicRoutes = [RootRoute];
