<template>
  <global-collapse v-model:activeKey="activeNames" ghost expand-icon-position="right">
    <a-collapse-panel key="setting" header="高级">
      <action-row label="唯一标识">
        <global-input readonly :value="schemaId" />
      </action-row>
    </a-collapse-panel>
  </global-collapse>
</template>

<script lang="ts" setup>
import type { Contenxt } from '#/editor';
import useContext from '@/hooks/useContext';

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema } = useInject();

const schemaId = computed(() => selectSchema.get()?.id);

// 展开的标签
const activeNames = ref('setting');
</script>
