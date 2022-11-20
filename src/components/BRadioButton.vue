<template>
  <div class="b-radio-button-wrapper">
    <div
      v-for="item in options"
      :key="item.value"
      class="b-radio-button"
      :class="{ 'is-active': (selected || defaultValue) === item.value }"
      @click="handleClickButton(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

type Record = { label: string; value: string };

interface Props {
  value?: string;

  defaultValue?: string;

  options: Record[];
}

const props = withDefaults(defineProps<Props>(), { value: '', defaultValue: '', options: () => [] });

const emit = defineEmits(['update:value']);

const selected = useVModel(props, 'value', emit);

function handleClickButton(record: Record) {
  selected.value = record.value;
}
</script>

<style lang="less">
.b-radio-button-wrapper {
  display: flex;
  width: 100%;
  height: 32px;
  font-size: 12px;
}

.b-radio-button {
  flex: 1;
  border: 1px solid #d9d9d9;
  border-right-width: 0;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  cursor: pointer;

  .flex-center();

  &:first-of-type {
    border-radius: 2px 0 0 2px;
  }

  &:last-of-type {
    border-right-width: 1px;
    border-radius: 0 2px 2px 0;
  }

  &:hover {
    background: var(--color-block-background-light);
  }

  &.is-active {
    border-color: var(--color-field-background-active);
    color: var(--color-field-color-active);
    background: var(--color-field-background-active);

    & + * {
      border-left-color: var(--color-field-background-active);
    }
  }
}
</style>
