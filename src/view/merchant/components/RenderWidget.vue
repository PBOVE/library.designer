<template>
  <component :is="views[name]" v-bind="props">
    <template #default="{ style }">
      <template v-if="list">
        <drop-container v-model:list="list" :style="style">
          <template #default="record">
            <render-widget v-model:children="record.children" :name="record.name" :props="record.props" />
          </template>
        </drop-container>
      </template>
    </template>
  </component>
</template>

<script lang="ts" setup>
import type { Schema } from '#/editor';
import type { WritableComputedRef } from 'vue';
import { isArray } from 'lodash-es';
import { DropContainer } from '~/compile/draggable';

interface Props {
  name: string;

  props: Indexable;

  children?: Schema[];
}

defineOptions({ name: 'RenderWidget' });

const setters = withDefaults(defineProps<Props>(), { schema: () => ({}), name: '', children: undefined });

const emit = defineEmits(['update:children']);

const gViewSource: Indexable<AutoComponent> = import.meta.glob('~/material/**/index.vue', { eager: true });

const views: Indexable = {};

const createWidgetName = (level: string, name: string) => `${level}-${name}`;

Object.entries(gViewSource).forEach(([key, component]) => {
  const match = key.match(/^.+\/material\/(.*)\/(.*)\/index.vue$/i);

  if (!match) return;

  const [, level, name] = match;

  const widgetName = createWidgetName(level, name);

  views[widgetName] ||= {};

  views[widgetName] = component.default;
});

let list: WritableComputedRef<Schema[] | undefined>;

if (isArray(setters.children)) {
  list = computed({ get: () => setters.children, set: (value) => emit('update:children', value) });
}
</script>
