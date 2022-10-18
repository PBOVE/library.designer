<template>
  <div class="bc-tree">
    <tab-pane-tree-node :list="widgetTree" />
  </div>
</template>

<script lang="ts" setup>
import type { Contenxt } from '#/editor';
import useContext from '@/hooks/useContext';
import TabPaneTreeNode from './TabPaneTreeNode.vue';

const { useInject } = useContext<Contenxt>('PageDesigner');

const { onInstance } = useInject();

const widgetTree = computed(() => onInstance.get('widgetTree'));
</script>

<style lang="less">
.bc-tree {
  border-top: 1px solid var(--border-color);
}
</style>
