<template>
  <component :is="views[name]">
    <template #default="{ style }">
      <drop-container v-model:list="list" :style="style">
        <template #default="record">
          <render-widget v-model:children="record.children" :name="record.name" :props="record.props" />
        </template>
      </drop-container>
    </template>
  </component>
</template>

<script lang="ts" setup>
import type { Schema } from '#/editor';
import { useVModel } from '@vueuse/core';
import { DropContainer } from '~/compile/draggable';

interface Props {
  name: string;

  props: Indexable;

  children?: Schema[];
}

defineOptions({ name: 'RenderWidget' });

const props = withDefaults(defineProps<Props>(), { schema: () => ({}), name: '', children: () => [] });

const emit = defineEmits(['update:children']);

const gViewSource: Indexable<AutoComponent> = import.meta.glob('~/material/**/index.vue', { eager: true });

const views: Indexable = {};

Object.entries(gViewSource).forEach(([key, component]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/index.vue$/i);

  if (!match) return;

  const [, , name] = match;

  views[name] ||= {};

  views[name] = component.default;
});

const list = useVModel(props, 'children', emit);
</script>
