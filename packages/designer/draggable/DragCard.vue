<template>
  <div :ref="setElement">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { DragSourceMonitor } from 'vue3-dnd';
import { useDrag } from 'vue3-dnd';

interface Props {
  item: unknown;

  clone?: (item: unknown) => unknown;
}

const props = withDefaults(defineProps<Props>(), {
  clone: undefined
});

const [, drag] = useDrag(() => ({
  type: 'PageDesigner',
  canDrag: true,
  item: props.clone?.(props.item),
  collect: (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging()
  })
}));

// 设置 dom
const setElement = (el: HTMLNULL) => drag.value(el);
</script>
