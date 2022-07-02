<template>
  <tab-container>
    <a-input v-model:value="inputSearch" placeholder="搜索组件" class="w-[calc(100%-24px)] m-12" />

    <div class="bg-light-650 h-1"></div>

    <template #scrollClint>
      <!-- 组件 -->
      <div v-for="item in treeData" :key="item.level">
        <div class="h-20 flex-y-center pl-12 font-bold mt-10">{{ item.label }}</div>

        <drag-container :list="item.children" item-key="name" :class="$style['container']" :clone="onCloneData">
          <template #default="{ record }">
            <div class="flex-y-center border border-light-750 rounded h-36 pl-8 cursor-grab bg-light-0">
              <icon :type="record.icon" color="rgba(31,56,88,.4)" size="18" />
              <div class="ml-8 fs-12">{{ record.label }}</div>
            </div>
          </template>
        </drag-container>
      </div>

      <a-empty v-if="!treeData.length" description="暂无组件" class="mt-50" />
    </template>
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

<style lang="less" module>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 10px 10px 24px;
}
</style>
