<template>
  <div
    class="b-tooltip-wrap"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>

    <div v-show="visible" class="b-tooltip" :title="title" :style="position">
      <slot name="title">{{ title }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';

interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), { title: '' });

const position = ref<CSSProperties>({});

const visible = ref<boolean>(false);

function handleMouseMove(event: MouseEvent) {
  position.value.transform = `translate(${event.pageX + 5}px,${event.pageY + 15}px) scale(0.84)`;
}

function handleMouseEnter() {
  visible.value = true;
}

function handleMouseLeave() {
  visible.value = false;
}
</script>

<style lang="less">
.b-tooltip {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
  white-space: nowrap;
  color: #fff;
  background-color: fade(#000, 85);
  box-shadow: 0 3px 6px -4px fade(#000, 12), 0 6px 16px fade(#000, 8), 0 9px 28px 8px fade(#000, 5);
  transform: scale(0.84);
}
</style>
