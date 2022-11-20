<template>
  <div class="bc-db-header">
    <global-input placeholder="请搜索" />
  </div>

  <div class="bc-db-buttons">
    <div class="bc-db-button" @click="handleClickMenu('value')">添加变量</div>

    <div class="bc-db-button" @click="handleClickMenu('remote')">添加远程API</div>
  </div>

  <draggable v-model="list" item-key="id" handle=".cursor-move">
    <template #item="{ element, index }">
      <div class="bc-db-list-item">
        <icon type="ant-design:holder-outlined" size="16" class="cursor-move" />

        <div class="bc-db-list-item-title" :class="element.protocal">{{ PROTOCAL[element.protocal] }}</div>

        <div class="bc-db-list-item-body truncate">{{ element.name }}</div>

        <icon type="ant-design:form-outlined" class="bc-button bc-db-list-item-icon" @click="handleEditData(element)" />

        <icon
          type="ant-design:delete-outlined"
          class="bc-button bc-db-list-item-icon"
          @click="handleDeleteData(index)"
        />
      </div>
    </template>
  </draggable>

  <!-- 变量 -->
  <database-value v-model:value="visible.value" :data-source="dataSource" @success="handleParamActive" />
  <!-- 远程 -->
  <database-remote v-model:value="visible.remote" :data-source="dataSource" @success="handleParamActive" />
</template>

<script lang="ts" setup>
import type { DataSource } from '#/editor';
import draggable from 'vuedraggable';
import DatabaseRemote from '../components/DatabaseRemote.vue';
import DatabaseValue from '../components/DatabaseValue.vue';

const PROTOCAL = {
  url: '参数',

  remote: '远程',

  value: '变量'
};

const visible = reactive({ remote: false, value: false });

const list = ref<DataSource[]>([]);

const dataSource = ref<DataSource | undefined>(undefined);

function handleClickMenu(key: 'remote' | 'value') {
  visible[key] = true;

  dataSource.value = undefined;
}

function handleEditData(element: DataSource) {
  visible[element.protocal] = true;

  dataSource.value = element;
}

function handleParamActive(record: DataSource) {
  !dataSource.value && list.value.push(record);
}

function handleDeleteData(index: number) {
  list.value.splice(index, 1);
}
</script>

<style lang="less">
.bc-db-header {
  display: flex;
  padding: 0 12px;
  margin: 8px 0 0;
}

.bc-db-buttons {
  padding: 12px;
}

.bc-db-button {
  display: inline-block;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  font-size: 12px;
  line-height: 32px;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }

  &:not(:last-of-type) {
    border-right-width: 0;
  }

  &:first-of-type {
    border-radius: 2px 0 0 2px;
  }

  &:last-of-type {
    border-radius: 0 2px 2px 0;
  }
}

.bc-db-list-item {
  height: 32px;
  padding: 0 4px;
  margin: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 12px;
  background: #fff;
  user-select: none;

  .flex-y-center();
}

.bc-db-list-item-title {
  margin: 0 5px;

  &.url {
    color: #fabd0e;
  }

  &.remote {
    color: #33a4ff;
  }

  &.value {
    color: #66bc5c;
  }
}

.bc-db-list-item-body {
  flex: 1;
}

.bc-db-list-item-icon {
  margin: 0 2px;
  font-size: 14px;
}
</style>
