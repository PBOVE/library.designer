import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT_COMPONENT } from '../constant';

const rootRouters: Indexable<{ default: RouteRecordRaw[] }> = import.meta.glob('./default/**.ts', { eager: true });

// 主框架根路由
const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root-router',
  component: DEFAULT_LAYOUT_COMPONENT,
  children: Object.values(rootRouters)
    .map((module) => module.default)
    .flat(1)
};

export const basicRoutes = [RootRoute];
