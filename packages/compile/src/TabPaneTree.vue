<template>
  <div ref="wrap" class="bc-tree">
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

  &:hover .bc-tree-node-branches::before {
    position: absolute;
    left: var(--branches-left);
    width: 1px;
    height: 100%;
    background: #e7e7e8;
    content: '';
  }
}
</style>
