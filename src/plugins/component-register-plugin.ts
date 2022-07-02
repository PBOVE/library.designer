import type { App } from 'vue';
import DraggablePlace from '@/components/Draggable/place.vue';
import PageDesigner from '~/designer/index.vue';

// 自动导入 只有一层的组件 - 文件结构
const modules = import.meta.globEager('@/components/**.(vue|tsx)');

export default class ComponentRegisterPlugin {
  static init(app: App): void {
    Object.entries(modules).forEach(([key, module]) => {
      app.component(key.replace(/^.+\/(.+).(vue|tsx)$/g, '$1'), module.default);
    });

    app.component('PageDesigner', PageDesigner);
    app.component('DraggablePlace', DraggablePlace);
  }
}
