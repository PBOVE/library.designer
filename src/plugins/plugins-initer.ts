import type { App } from 'vue';
import componentRegisterPlugin from './component-register-plugin';

export default class PluginsIniter {
  static init(app: App<Element>): void {
    // 全局组件注入
    componentRegisterPlugin.init(app);
  }
}
