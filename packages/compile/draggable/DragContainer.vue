<template>
  <div>
    <drag-card v-for="item in list" :key="item[itemKey]" :clone="clone" :item="item">
      <slot :record="item"></slot>
    </drag-card>
  </div>
</template>

<script lang="ts" setup>
import type { Template } from '#/editor';
import DragCard from './DragCard.vue';

interface Props {
  //  渲染列表数据
  list: PickRequired<Template, 'name'>[];

  itemKey: string;

  clone?: (item: Template) => Omit<Template, 'icon'>;
}

withDefaults(defineProps<Props>(), {
  clone: undefined
});
</script>
