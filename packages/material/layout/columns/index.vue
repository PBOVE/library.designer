<template>
  <div :class="$style.wrap">
    <div
      v-for="(item, index) in layout"
      :key="index"
      :style="{ 'grid-area': `span 1 / span ${item || 1} / auto / auto` }"
    >
      {{ item || '1' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Props } from './interface';

const props = withDefaults(defineProps<Props>(), { layout: '', rowGap: '', columnGap: '' });

const layout = computed(() => props.layout.split(':'));
</script>

<style lang="less" module>
.wrap {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
</style>
