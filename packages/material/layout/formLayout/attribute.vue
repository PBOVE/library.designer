<template>
  <action-row label="标题位置">
    <b-radio-button v-model:value="dataItem.labelAlign" :options="labelAligns" default-value="top" />
  </action-row>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { Props as Value } from './interface';

interface Props {
  value?: Value;
}

const props = withDefaults(defineProps<Props>(), { value: () => ({}) });

const emit = defineEmits(['update:value']);

const dataItem = useVModel(props, 'value', emit);

const labelAligns = [
  { label: '左', value: 'left' },
  { label: '上', value: 'top' },
  { label: '内', value: 'inner' }
];
</script>
