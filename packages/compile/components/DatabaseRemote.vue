<template>
  <a-drawer v-model:visible="visible" width="330" :closable="false" :body-style="{ padding: 0 }">
    <template #title>
      <div class="db-remote-header">
        <div>添加数据源</div>

        <div>
          <a-button type="primary">保存</a-button>
        </div>
      </div>
    </template>

    <action-row label="名称" :divider="false">
      <a-input placeholder="只能包含数字字母及下划线" />
    </action-row>

    <action-row label="描述" :divider="false">
      <a-input placeholder="请输入" />
    </action-row>

    <action-row label="发送方式" :divider="false">
      <global-select :options="sends" />
    </action-row>

    <action-row label="请求地址" :divider="false">
      <a-textarea :auto-size="{ minRows: 3, maxRows: 3 }" />
    </action-row>

    <b-collapse-divider title="请求参数" />

    <draggable v-model="list" item-key="id" handle=".cursor-move">
      <template #item="{ element, index }">
        <div class="db-param-item">
          <icon type="ant-design:holder-outlined" size="16" class="cursor-move" />

          <a-input v-model:value="element.key" class="ml-10" placeholder="参数名" />

          <a-input v-model:value="element.value" class="ml-10" placeholder="参数值" />

          <icon
            type="ant-design:delete-outlined"
            class="bc-button ml-10 cursor-pointer"
            @click="handleDeleteParamItem(index)"
          />
        </div>
      </template>
    </draggable>

    <a-button type="primary" class="mx-10 mt-7 mb-4 w-[calc(100%-20px)]" @click="handleNewParamItem">添加一项</a-button>

    <b-collapse-divider title="返回结果字段映射" />

    <action-row label="状态码" :divider="false">
      <a-input />
    </action-row>

    <action-row label="接口处理信息" :divider="false">
      <a-input />
    </action-row>

    <action-row label="接口具体数据" :divider="false">
      <a-input />
    </action-row>

    <b-collapse-divider title="请求返回时的数据" />

    <action-row label="状态码验证" :divider="false">
      <div class="flex">
        <global-select :options="status" class="mr-10" placeholder="类型" />
        <a-input placeholder="数值" />
      </div>
    </action-row>

    <action-row label="请求成功提示" :divider="false">
      <a-input />
    </action-row>

    <action-row label="请求错误提示" :divider="false">
      <a-input />
    </action-row>
  </a-drawer>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { buildUUID } from '@/utils/uuid';

interface Props {
  value: boolean;
}

interface Param {
  key: string;

  value: string;

  id: string;
}

const props = withDefaults(defineProps<Props>(), { value: false });

const emit = defineEmits(['update:value']);

const visible = computed({ set: (v) => emit('update:value', v), get: () => props.value });

const status = [
  { value: 'string', label: '字符串' },
  { value: 'number', label: '数字' },
  { value: 'boolean', label: '布尔' }
];

const sends = [
  { value: 'get', label: 'GET' },
  { value: 'post', label: 'POST' },
  { value: 'put', label: 'PUT' },
  { value: 'patch', label: 'PATCH' },
  { value: 'delete', label: 'DELETE' }
];

const list = ref<Param[]>([]);

function handleNewParamItem() {
  list.value.push({ key: '', value: '', id: buildUUID() });
}

function handleDeleteParamItem(index: number) {
  list.value.splice(index, 1);
}
</script>

<style lang="less">
.db-remote-header {
  .justify-between();
  .items-center();
}

.db-param-item {
  display: flex;
  align-items: center;
  padding: 8px;
  background: #fff;
}
</style>
