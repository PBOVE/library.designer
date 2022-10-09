<template>
  <page-compile v-model:page="page" class="h-screen w-screen" :template-tree="templateTree">
    <template #title> TIBIS </template>

    <template #view="record">
      <component :is="views[record.name]" />
    </template>

    <template #setter="{ view, schema }">
      <component :is="setters[schema.name][view]" />
    </template>
  </page-compile>
</template>

<script lang="ts" setup>
import type { TemplateTree, Page, Module, Setter, AutoComponent } from '#/editor';
// 模型工具源
const gSchemaSource: Indexable<Module> = import.meta.glob('~/material/**/schema.ts', { eager: true });

const gAttrSource: Indexable<AutoComponent> = import.meta.glob('~/material/**/attribute.vue', { eager: true });

const gViewSource: Indexable<AutoComponent> = import.meta.glob('~/material/**/index.vue', { eager: true });

const page = ref<Page>({ widgetTree: [] });

const setters: Setter = {};

const views: Indexable = {};

// 工具树
const templateTree: TemplateTree[] = [
  { label: '布局', level: 'layout', children: [] },
  { label: '基本', level: 'base', children: [] }
];

Object.entries(gSchemaSource).forEach(([key, module]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/schema.ts$/i);

  if (!match || !module.template) return;

  const [, level, name] = match;

  const index = templateTree.findIndex((el) => el.level === level);

  if (index === -1) return;

  templateTree[index].children.push({ ...module.template, name });
});

Object.entries(gAttrSource).forEach(([key, component]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/attribute.vue$/i);

  if (!match) return;

  const [, , name] = match;

  setters[name] ||= {};

  setters[name].attribute = component.default;
});

Object.entries(gViewSource).forEach(([key, component]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/index.vue$/i);

  if (!match) return;

  const [, , name] = match;

  views[name] ||= {};

  views[name] = component.default;
});

console.log(setters);

// const TabPane =
</script>
