import type { App } from 'vue';
import DraggablePlace from '@/components/Draggable/place.vue';

// 自动导入 只有一层的组件 - 文件结构
const modules: Indexable<AutoComponent> = import.meta.glob('@/components/**.(vue|tsx)', { eager: true });

export default class ComponentRegisterPlugin {
  static init(app: App): void {
    Object.entries(modules).forEach(([key, module]) => {
      app.component(key.replace(/^.+\/(.+).(vue|tsx)$/g, '$1'), module.default);
    });

    app.component('DraggablePlace', DraggablePlace);
  }
}
