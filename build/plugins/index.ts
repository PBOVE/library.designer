import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import windiCSS from 'vite-plugin-windicss';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import VueTypeImports from 'vite-plugin-vue-type-imports';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { configAutoImportPlugin } from './auto-import';
import { autoRegistryComponents } from './component';

export function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // 类型导入
    VueTypeImports()
  ];

  vitePlugins.push(VueSetupExtend());

  vitePlugins.push(configAutoImportPlugin());

  vitePlugins.push(windiCSS());

  vitePlugins.push(DefineOptions());

  vitePlugins.push(autoRegistryComponents());

  return vitePlugins;
}
