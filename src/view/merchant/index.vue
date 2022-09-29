<template>
  <page-compile v-model:page="page" class="h-screen w-screen" :template-tree="templateTree">
    <template #title> 海阅编辑器 </template>

    <template #view="record"> {{ record }}</template>
  </page-compile>
</template>

<script lang="ts" setup>
import type { TemplateTree, Page } from '#/editor';
// 模型工具源
const globalSchemaSource = import.meta.globEager('~/material/**/schema.ts');

const page = ref<Page>({ widgetTree: [] });

// 工具树
const templateTree: TemplateTree[] = [
  { label: '布局', level: 'layout', children: [] },
  { label: '基本', level: 'base', children: [] }
];

Object.entries(globalSchemaSource).forEach(([key, module]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/schema.ts$/i);

  if (!match || !module.template) return;

  const [, level, name] = match;

  const index = templateTree.findIndex((el) => el.level === level);

  if (index === -1) return;

  templateTree[index].children.push({ ...module.template, name });
});

console.log(templateTree);

// const TabPane =
</script>
