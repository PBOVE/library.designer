<template>
  <global-select>
    <a-select-option v-for="item in options" :key="item.label" :value="item.value"> {{ item.label }}</a-select-option>
  </global-select>
</template>

<script setup lang="ts">
const options = [
  { label: '邮箱', value: 'email' },
  { label: '电话', value: 'mobile' }
];
</script>

<style lang="less">
.parity-select-wrap {
  .ant-select-selector {
    padding: 0 !important;
  }

  &.ant-select:not(.ant-select-disabled):hover {
    .ant-select-selector {
      border-color: transparent !important;
      border-right-width: 0 !important;
    }
  }
}
</style>
