<template>
  <b-collapse-divider title="状态" />
  <action-row label="隐藏">
    <a-switch v-model:checked="dataItem.hidden" />
  </action-row>
</template>

<script lang="ts" setup>
import { Props as Value } from './interface';

interface Props {
  value?: Value;
}

const props = withDefaults(defineProps<Props>(), { value: () => ({}) });

const emit = defineEmits(['update:value']);

const dataItem = computed({ get: () => props.value, set: () => emit('update:value') });
</script>
