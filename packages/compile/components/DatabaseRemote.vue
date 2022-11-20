<template>
  <global-drawer v-model:value="visible" width="330" :mask-closable="operation" :closable="operation">
    <template #title> {{ title }}数据源 </template>

    <template #closable>
      <div>
        <a-button type="primary" @click="handleClickSaveData">保存</a-button>

        <a-button class="db-remote-cancel" @click="handleClickCancelData">取消</a-button>
      </div>
    </template>

    <action-row label="名称" :divider="false">
      <global-input v-model:value="dataItem.name" placeholder="请输入" />
    </action-row>

    <action-row label="描述" :divider="false">
      <global-input v-model:value="dataItem.description" placeholder="请输入" />
    </action-row>

    <action-row label="发送方式" :divider="false">
      <global-select v-model:value="dataItem.options!.method" :options="sends" />
    </action-row>

    <action-row label="请求地址" :divider="false">
      <a-textarea v-model:value="dataItem.options!.url" :auto-size="{ minRows: 3, maxRows: 3 }" />
    </action-row>

    <b-collapse-divider title="请求参数" />

    <a-button type="primary" class="db-remote-params-button" @click="handleOpenParamsModel">添加一项</a-button>

    <b-collapse-divider title="返回结果字段映射" />

    <action-row label="状态码" :divider="false">
      <global-input />
    </action-row>

    <action-row label="接口处理信息" :divider="false">
      <global-input />
    </action-row>

    <action-row label="接口具体数据" :divider="false">
      <global-input />
    </action-row>

    <b-collapse-divider title="请求返回时的数据" />

    <action-row label="状态码验证" :divider="false">
      <div class="flex">
        <variable-type-select class="mr-10" />

        <global-input />
      </div>
    </action-row>

    <action-row label="请求成功提示" :divider="false">
      <global-input />
    </action-row>

    <action-row label="请求错误提示" :divider="false">
      <global-input />
    </action-row>

    {{ dataItem }}
  </global-drawer>
</template>

<script lang="ts" setup>
import type { DataSource } from '#/editor';
import type { Rules } from 'async-validator';
import { useValidator } from '@/hooks/useValidator';
import { useMessage } from '@/hooks/useMessage';
// import ParamDragList from './ParamDragList.vue';
import VariableTypeSelect from './VariableTypeSelect.vue';

interface Props {
  value: boolean;

  dataSource?: DataSource | undefined;
}

const props = withDefaults(defineProps<Props>(), { value: false, dataSource: undefined });

const emit = defineEmits(['update:value', 'success']);

const visible = computed({ set: (v) => emit('update:value', v), get: () => props.value });

const modal = reactive({ params: false });

const dataItem = ref<DeepPartial<DataSource>>({});

const rules: Rules = {
  name: { required: true, message: '请输入数据源名称' },
  options: {
    type: 'object',
    fields: {
      method: { required: true, message: '请选择数据源发送方式' },
      url: { required: true, message: '请输入数据源URL' }
    }
  }
};

const validate = useValidator(rules);

const sends = [
  { value: 'get', label: 'GET' },
  { value: 'post', label: 'POST' },
  { value: 'put', label: 'PUT' },
  { value: 'patch', label: 'PATCH' },
  { value: 'delete', label: 'DELETE' }
];

const operation = computed(() => !!props.dataSource);

const title = computed(() => (unref(operation) ? '编辑' : '添加'));

watch(
  () => props.value,
  (value) => {
    // 设置数据
    value && (dataItem.value = unref(operation) ? props.dataSource : { options: { params: [] }, protocal: 'remote' });
  }
);

async function handleClickSaveData() {
  const [result, status] = await validate(dataItem.value, { first: true });

  if (status) {
    emit('success', dataItem.value);

    visible.value = false;

    return;
  }

  const { errors } = result;

  useMessage(errors.at(0)?.message);
}

function handleClickCancelData() {
  visible.value = false;
}

function handleOpenParamsModel() {
  modal.params = true;
}
</script>

<style lang="less">
.db-remote-header {
  .justify-between();
  .items-center();
}

.db-remote-cancel {
  margin-left: 10px;
}

.db-remote-params-button {
  width: calc(100% - 40px);
  margin: 7px 20px 4px;
}
</style>
