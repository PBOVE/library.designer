<template>
  <tab-container>
    <template #head>
      <div class="bc-component-search">
        <a-input v-model:value="inputSearch" placeholder="搜索组件" />
      </div>
    </template>

    <!-- 组件 -->
    <div v-for="item in treeData" :key="item.level">
      <div class="bc-component-label">{{ item.label }}</div>

      <drag-container :list="item.children" item-key="name" class="bc-component-list" :clone="onCloneData">
        <template #default="{ record }">
          <div class="bc-component-item">
            <icon :type="record.icon" size="18" class="bc-component-item-icon" />
            <div class="bc-component-item-title">{{ record.label }}</div>
          </div>
        </template>
      </drag-container>
    </div>

    <a-empty v-if="!treeData.length" description="暂无组件" class="mt-50" />
  </tab-container>
</template>

<script lang="ts" setup>
import type { TemplateTree, Template, Contenxt } from '#/editor';
import { isEmpty, omit, assign } from 'lodash-es';
import useContext from '@/hooks/useContext';
import { DragContainer } from '../draggable';
import TabContainer from './TabContainer.vue';

const inputSearch = ref<string>('');

const { useInject } = useContext<Contenxt>('PageDesigner');

const { templateTree } = useInject();

const onCloneData = ({ name, label }: Required<Template>) => ({ name, label });

// 渲染组件
const treeData = computed(() => {
  if (inputSearch.value) {
    const search = unref(inputSearch).replace(/(\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g, '\\$1');

    const searchRE = new RegExp(search, 'i');

    const tree: TemplateTree[] = [];

    templateTree.forEach((el) => {
      const result = el.children.filter((node) => searchRE.test(node.name ?? '') || searchRE.test(node.label));

      if (!isEmpty(result)) {
        tree.push(assign({}, omit(el, ['children']), { children: result }));
      }
    });

    return tree;
  }

  return templateTree;
});
</script>

<style lang="less">
.bc-component-search {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
}

.bc-component-label {
  height: 20px;
  padding-left: 12px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 12px;
  .flex-y-center();
}

.bc-component-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 10px 10px 24px;
}

.bc-component-item {
  height: 36px;
  padding-left: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: var(--text-color);
  background: #fff;
  cursor: grab;
  .flex-y-center();

  &:hover {
    border-color: @primary-color;
    color: @primary-color;

    .bc-component-item-icon {
      color: @primary-color;
    }
  }

  &:active {
    cursor: grabbing;
  }
}

.bc-component-item-icon {
  color: #d9d9d9;
}

.bc-component-item-title {
  margin-left: 12px;
  font-size: 12px;
}
</style>
