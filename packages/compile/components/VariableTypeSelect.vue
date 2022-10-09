<template>
  <div class="variable-type-select">
    <global-select v-model:value="selected" :options="options" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), { value: undefined });

const emit = defineEmits(['update:value']);

const selected = computed({ get: () => props.value, set: (value) => emit('update:value', value) });

const options = [
  { value: 'string', label: '字符串' },
  { value: 'number', label: '数字' },
  { value: 'boolean', label: '布尔' }
];
</script>

<style lang="less">
.variable-type-select {
  width: 75px;
}
</style>
