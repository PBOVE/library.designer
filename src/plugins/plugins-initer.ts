import type { App } from 'vue';
import componentRegisterPlugin from './component-register-plugin';
import elementUiPlugins from './ant-ui-plugins';

export default class PluginsIniter {
  static init(app: App<Element>): void {
    // 全局组件注入
    componentRegisterPlugin.init(app);

    // ui 注册
    elementUiPlugins.init(app);
  }
}
