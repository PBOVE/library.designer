import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './routes';

const { VITE_PUBLIC_PATH } = import.meta.env;

const router = createRouter({
  history: createWebHistory(VITE_PUBLIC_PATH),
  routes: basicRoutes as RouteRecordRaw[]
});

export function setupRouter(app: App<Element>): void {
  app.use(router);
}
