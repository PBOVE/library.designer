<template>
  <a-input :placeholder="placeholder" class="global-input-affix-wrapper">
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </a-input>
</template>

<script lang="ts" setup>
interface Props {
  placeholder?: string;
}

withDefaults(defineProps<Props>(), { placeholder: '请输入' });
</script>

<style last="less">
.global-input-affix-wrapper {
  height: 32px;
  padding: 0 10px;
}
</style>
