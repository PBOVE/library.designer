<template>
  <!-- <form-item :title="title" :label-align="labelAlign" :label-span="labelSpan"> -->
  <div :placeholder="placeholder" :class="$style.input"></div>
  <!-- </form-item> -->
</template>

<script lang="ts" setup>
// import FormItem from '~/components/FormItem.vue';
import { Props } from './interface';

withDefaults(defineProps<Props>(), { title: '', placeholder: '', labelAlign: 'top', labelSpan: undefined });
</script>

<style lang="less" module>
.input {
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  &::before {
    padding: 10px;
    line-height: 40px;
    color: #999;
    content: attr(placeholder);
  }
}
</style>
