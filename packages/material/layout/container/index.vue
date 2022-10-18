<template>
  <div :class="$style.wrap">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Schema } from '#/editor';
import type { Props as Value } from './interface';

interface Props {
  props?: Value;

  children?: Schema[];
}

withDefaults(defineProps<Props>(), { children: () => [], props: () => ({}) });
</script>

<style lang="less" module>
.wrap {
}
</style>
