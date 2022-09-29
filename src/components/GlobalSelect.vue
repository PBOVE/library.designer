<template>
  <a-select :placeholder="placeholder" allow-clear>
    <template #suffixIcon>
      <icon type="ep:arrow-down" />
    </template>
  </a-select>
</template>

<script lang="ts" setup>
interface Props {
  placeholder?: string;
}

withDefaults(defineProps<Props>(), { placeholder: '请选择' });
</script>
