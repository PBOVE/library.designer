<template>
  <div class="bc-settings-main">
    <action-tab :options="options">
      <template #default="{ record }">
        <slot v-if="record?.slot" v-bind="{ view: record.name, schema }"></slot>
        <!-- 样式 -->
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
import StyleSetter from './src/ActionStyle.vue';
import Attribute from './src/ActionAttr.vue';

export default defineComponent({
  components: { InterfaceSetter, AttributeSetter, ActionTab, Attribute, StyleSetter },
  setup() {
    const { useInject } = useContext<Contenxt>('PageDesigner');

    const { selectSchema } = useInject();

    const schema = computed(() => selectSchema.get());

    const schemaId = computed(() => selectSchema.get()?.id);

    const options = computed(() => {
      if (schemaId.value) {
        return [
          { name: 'attribute', label: '属性', slot: true },
          { name: 'style-setter', label: '样式' },
          { name: 'event', label: '高级' }
        ];
      }
      // 页面配置
      return [
        { name: 'attribute-setter', label: '属性' },
        { name: 'style-setter', label: '样式' }
      ];
    });

    return { options, schema };
  }
});
</script>

<style lang="less">
.bc-settings-main {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-color);
}
</style>
