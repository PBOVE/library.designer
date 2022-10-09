<template>
  <a-drawer v-model:visible="visible" :closable="false" :body-style="{ padding: 0 }">
    <template #title>
      <div class="global-drawer-header">
        <slot name="title"></slot>

        <icon
          v-if="closable"
          type="ant-design:close-outlined"
          class="global-drawer-closable"
          @click="handleClickClose"
        />

        <slot v-else name="closable"></slot>
      </div>
    </template>

    <slot></slot>
  </a-drawer>
</template>

<script lang="ts" setup>
interface Props {
  value: boolean;

  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), { value: false, closable: false });

const emit = defineEmits(['update:value']);

const visible = computed({ set: (v) => emit('update:value', v), get: () => props.value });

function handleClickClose() {
  visible.value = false;
}
</script>

<style lang="less">
.global-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.global-drawer-closable {
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
</style>
