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

    <b-collapse-divider title="数据" />

    <action-row label="字段名称" :divider="false" type="vertical">
      <global-input v-model:value="dataItem.initialData!.key" placeholder="请输入" />
    </action-row>

    <action-row label="字段类型" :divider="false" type="vertical">
      <global-input v-model:value="dataItem.initialData!.value" placeholder="请输入" />
    </action-row>

    <action-row label="值" :divider="false" type="vertical">
      <global-input v-model:value="dataItem.initialData!.value" placeholder="请输入" />
    </action-row>
  </global-drawer>
</template>

<script lang="ts" setup>
import type { DataSource } from '#/editor';
import type { Rules } from 'async-validator';
import { useValidator } from '@/hooks/useValidator';
import { useMessage } from '@/hooks/useMessage';

interface Props {
  value: boolean;

  dataSource?: DataSource | undefined;
}

const props = withDefaults(defineProps<Props>(), { value: false, dataSource: undefined });

const emit = defineEmits(['update:value', 'success']);

const visible = computed({ set: (v) => emit('update:value', v), get: () => props.value });

const dataItem = ref<DeepPartial<DataSource>>({});

const operation = computed(() => !!props.dataSource);

const title = computed(() => (unref(operation) ? '编辑' : '添加'));

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

watch(
  () => props.value,
  (value) => {
    // 设置数据
    value && (dataItem.value = unref(operation) ? props.dataSource : { initialData: {}, protocal: 'value' });
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
</script>

<style lang="less">
.db-value-data {
  padding: 7px 20px 4px;
}
</style>
