<template>
  <a-input-number :placeholder="placeholder" :controls="controls" class="global-input-number">
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </a-input-number>
</template>

<script lang="ts" setup>
interface Props {
  placeholder?: string;

  controls?: boolean;
}

withDefaults(defineProps<Props>(), { placeholder: '请输入', controls: false });
</script>

<style lang="less">
.global-input-number.ant-input-number {
  width: 100%;
}
</style>
