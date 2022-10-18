<template>
  <div class="bc-drag-layer">
    <div v-if="visible" :style="{ transform }" class="bc-drag-layer-view">
      {{ schema.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Schema } from '#/editor';
import { useDragLayer } from 'vue3-dnd';

const collect = useDragLayer((monitor) => ({
  isDragging: monitor.isDragging(),
  schema: monitor.getItem(),
  clientOffset: monitor.getClientOffset()
}));

const schema = computed(() => collect.value.schema as Schema);

const isDragging = computed(() => collect.value.isDragging);

const visible = computed(() => !!unref(isDragging) && !!unref(schema)?.id);

const transform = computed(() => {
  const { clientOffset } = unref(collect);

  return `translate(${clientOffset?.x || 0}px, ${clientOffset?.y || 0}px)`;
});
</script>

<style lang="less">
.bc-drag-layer {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  inset: 0;
}

.bc-drag-layer-view {
  display: inline-block;
  padding: 0 20px;
  font-size: 12px;
  color: #fff;
  background-color: fade(@primary-color, 80);
}
</style>
