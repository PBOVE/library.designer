<template>
  <div class="bc-settings-main">
    <action-tab :options="options">
      <template #default="{ record }">
        <component :is="record.name" />
      </template>
    </action-tab>
  </div>
</template>

<script lang="ts">
import type { Contenxt } from '#/editor';
import useContext from '@/hooks/useContext';
import InterfaceSetter from './src/PageSetter/Interface.vue';
import AttributeSetter from './src/PageSetter/attribute.vue';
import ActionTab from './src/ActionTab.vue';

export default defineComponent({
  components: { InterfaceSetter, AttributeSetter, ActionTab },
  setup() {
    const { useInject } = useContext<Contenxt>('PageDesigner');

    const { selectSchema } = useInject();

    const schemaId = computed(() => selectSchema.get()?.id);

    const options = computed(() => {
      if (schemaId.value) {
        return [
          { name: 'setting', label: '属性' },
          { name: 'style', label: '样式' },
          { name: 'event', label: '事件' }
        ];
      }
      // 页面配置
      return [
        { name: 'attribute-setter', label: '属性' },
        { name: 'interface-setter', label: '接口' }
      ];
    });

    return { options };
  }
});
</script>

<style lang="less">
.bc-settings-main {
  border-left: 1px solid var(--border-color);
}
</style>
