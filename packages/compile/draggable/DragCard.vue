<template>
  <div>
    <div :ref="drag">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Template } from '#/editor';
import type { DragSourceMonitor } from 'vue3-dnd';
import { useDrag } from 'vue3-dnd';

interface Props {
  item: PickRequired<Template, 'name'>;

  clone?: (item: Template) => Omit<Template, 'icon'>;
}

const props = withDefaults(defineProps<Props>(), { clone: undefined });

const [, drag] = useDrag(() => ({
  type: 'PageDesigner',
  canDrag: true,
  item: props.clone?.(props.item),
  collect: (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() })
}));
</script>
