<template>
  <action-row label="显示" :is-value="value" divider>
    <global-select v-model:value="selected" :options="options" />
  </action-row>
</template>

<script lang="ts" setup>
interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), { value: '' });

const emit = defineEmits(['update:value']);

const options = [
  { label: '块级元素', value: 'block' },
  { label: '内联元素', value: 'inline' },
  { label: '行内块元素', value: 'inline-block' }
];

const selected = computed({
  get: () => props.value || 'block',
  set: (value) => emit('update:value', value)
});
</script>
