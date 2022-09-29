import { resolve } from 'path';

/**
 * less 样式全局配置
 */
export function generateModifyVars() {
  return {
    'primary-color': '#2468f2',
    'font-size-base': '12px',
    'tabs-title-font-size': '14px',

    // 通过 less 文件覆盖
    hack: `true; @import "${resolve('src/assets/css/global.less')}";`
  };
}
