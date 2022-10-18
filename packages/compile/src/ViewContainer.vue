<template>
  <div :style="root">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { kebabCase } from 'lodash-es';

defineOptions({ name: 'ViewContainer' });

interface Props {
  style?: Recordable<CSSProperties>;
}

const props = withDefaults(defineProps<Props>(), { style: () => ({}) });

const root = computed(() => {
  const result = Object.entries(props.style[':root'] || {});

  return result.reduce((total, [key, value]) => `${total} ${kebabCase(key)}: ${value};`, '');
});
</script>
