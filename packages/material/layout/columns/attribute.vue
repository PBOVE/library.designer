<template>
  <b-collapse-divider title="布局" />

  <action-row label="列布局" reminder="请严格按照格式输入，每一行可用 12 格，支持多行">
    <global-input v-model:value="dataItem.layout" placeholder="请输入" />
  </action-row>

  <action-row label="列间距">
    <unit-input-number placeholder="请输入" />
  </action-row>

  <action-row label="行间距">
    <unit-input-number placeholder="请输入" />
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
</script>
