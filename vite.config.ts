import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { createVitePlugins, resolvePath } from './build';
import { wrapperEnv } from './build/utils';
import { generateModifyVars } from './build/config/generateModifyVars';

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH } = viteEnv;

  const vitePath = resolvePath('./', import.meta.url);

  return {
    root,

    resolve: {
      alias: {
        '@': vitePath.src,
        '#': vitePath.typings,
        '~': vitePath.packages
      }
    },

    server: {
      // 监听地址
      host: true,
      /**
       * 端口号
       * @default 3000
       */
      port: 8099,

      /**
       * 运行自动打开浏览器·
       * @default 'false'
       */
      open: false,

      // 本地跨域代理
      proxy: {}
    },

    /**
     * 基本公共路径
     * @default '/'
     */
    base: VITE_PUBLIC_PATH,

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },

    plugins: createVitePlugins()
  };
};
