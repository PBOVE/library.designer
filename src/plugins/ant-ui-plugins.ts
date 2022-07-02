import type { App } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

export default class ElementUiPlugins {
  static init(app: App<Element>): void {
    app.use(Antd);
  }
}
