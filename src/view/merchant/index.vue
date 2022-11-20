<template>
  <page-compile v-model:page="page" class="h-screen w-screen" :template-tree="templateTree">
    <template #title> TIBIS </template>

    <template #view="record">
      <render-widget v-model:children="record.children" :name="record.name" :props="record.props" />
    </template>

    <template #setter="{ view, schema }">
      <component :is="setters[schema.name][view]" v-model:value="schema.props" />
    </template>
  </page-compile>
</template>

<script lang="ts" setup>
import type { TemplateTree, Page, Module, Setter } from '#/editor';
import PageCompile from '~/compile/index.vue';
import RenderWidget from './components/RenderWidget.vue';

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
  { label: '基本', level: 'base', children: [] },
  { label: '表单', level: 'form', children: [] }
];

const createWidgetName = (level: string, name: string) => `${level}-${name}`;

Object.entries(gSchemaSource).forEach(([key, module]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/schema.ts$/i);

  if (!match || !module.template) return;

  const [, level, name] = match;

  const index = templateTree.findIndex((el) => el.level === level);

  if (index === -1) return;

  const widgetName = createWidgetName(level, name);

  templateTree[index].children.push({ ...module.template, name: widgetName });
});

Object.entries(gAttrSource).forEach(([key, component]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/attribute.vue$/i);

  if (!match) return;

  const [, level, name] = match;

  const widgetName = createWidgetName(level, name);

  setters[widgetName] ||= {};

  setters[widgetName].attribute = component.default;
});

Object.entries(gViewSource).forEach(([key, component]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/index.vue$/i);

  if (!match) return;

  const [, level, name] = match;

  const widgetName = createWidgetName(level, name);

  views[widgetName] ||= {};

  views[widgetName] = component.default;
});
</script>
