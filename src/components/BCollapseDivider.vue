<template>
  <div class="b-collapse-divider">{{ title }}</div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
}

withDefaults(defineProps<Props>(), { title: '' });
</script>

<style lang="less">
.b-collapse-divider {
  height: 32px;
  padding: 0 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
  color: var(--text-color);
  background-color: #f2f3f5;

  .flex-y-center();
}
</style>
