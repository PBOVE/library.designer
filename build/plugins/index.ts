import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import windiCSS from 'vite-plugin-windicss';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import autoImport from './auto-import';

export function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx()
  ];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  vitePlugins.push(VueSetupExtend());

  vitePlugins.push(...autoImport());

  return vitePlugins;
}
