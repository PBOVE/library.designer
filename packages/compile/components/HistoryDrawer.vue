<template>
  <a-drawer v-model:visible="visible" width="330" :closable="false" :body-style="{ padding: 0 }">
    <template #title> 修改历史 </template>

    <div class="history-item">
      <div>
        <div class="history-item-time">2022/07/04 01:03:33</div>
        <div>当前版本</div>
      </div>

      <div></div>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
interface Props {
  value: boolean;
}

const props = withDefaults(defineProps<Props>(), { value: false });

const emit = defineEmits(['update:value']);

const visible = computed({ set: (v) => emit('update:value', v), get: () => props.value });
</script>

<style lang="less">
.history-item {
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;

  &-time {
    padding-bottom: 10px;
  }

  &:hover {
    background-color: var(--color-block-background-light);
  }
}
</style>
