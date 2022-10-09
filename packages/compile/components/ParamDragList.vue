<template>
  <draggable v-model="list" item-key="id" handle=".cursor-move">
    <template #item="{ element, index }">
      <div class="param-list-item">
        <icon type="ant-design:holder-outlined" size="16" class="cursor-move" />

        <a-input v-model:value="element.key" class="ml-10" placeholder="字段名称" />

        <a-input v-model:value="element.value" class="ml-10" placeholder="值" />

        <variable-type-select v-model:value="element.type" class="param-list-item-select" />

        <icon
          type="ant-design:delete-outlined"
          class="bc-button param-list-item-delete"
          @click="handleDeleteParamItem(index)"
        />
      </div>
    </template>
  </draggable>

  <a-button type="primary" class="param-list-button" @click="handleNewParamItem">添加一项</a-button>
</template>

<script lang="ts" setup>
import type { Params } from '#/editor';
import draggable from 'vuedraggable';
import { buildUUID } from '@/utils/uuid';
import VariableTypeSelect from './VariableTypeSelect.vue';

interface Props {
  value?: (Partial<Params> | undefined)[];
}

const props = withDefaults(defineProps<Props>(), { value: () => [] });

const emit = defineEmits(['update:value']);

const list = computed({ get: () => props.value, set: (value) => emit('update:value', value) });

function handleNewParamItem() {
  list.value.push({ key: '', value: '', type: undefined, id: buildUUID() });
}

function handleDeleteParamItem(index: number) {
  list.value.splice(index, 1);
}
</script>

<style lang="less">
.param-list-item {
  display: flex;
  align-items: center;
  padding: 8px;
  background: #fff;
  cursor: pointer;
}

.param-list-item-delete {
  margin-left: 10px;
}

.param-list-button {
  width: calc(100% - 20px);
  margin: 7px 10px;
}

.param-list-item-select {
  flex-shrink: 0;
  margin-left: 10px;
}
</style>
