<template>
  <action-row label="标题">
    <global-input v-model:value="dataItem.title" />
  </action-row>
  <action-row label="默认值">
    <a-textarea v-model:value="dataItem.value" :auto-size="{ minRows: 3, maxRows: 3 }" />
  </action-row>

  <action-row label="标题位置">
    <b-radio-button v-model:value="dataItem.labelAlign" :options="labelAligns" default-value="top" />
  </action-row>

  <template v-if="dataItem.labelAlign === 'left'">
    <action-row label="标题宽度">
      <global-input-number v-model:value="dataItem.labelSpan" min="0" max="24" />
    </action-row>

    <action-row label="标题偏移">
      <global-input-number v-model:value="dataItem.labelOffset" />
    </action-row>

    <action-row label="内容偏移">
      <global-input-number v-model:value="dataItem.wrapperSpan" />
    </action-row>
  </template>

  <action-row label="占位提示">
    <global-input v-model:value="dataItem.placeholder" />
  </action-row>
  <action-row label="描述信息">
    <global-input v-model:value="dataItem.tips" />
  </action-row>
  <action-row label="类型">
    <b-radio-button v-model:value="dataItem.type" :options="types" default-value="text" />
  </action-row>
  <action-row label="状态">
    <b-radio-button v-model:value="dataItem.state" :options="states" default-value="default" />
  </action-row>
  <action-row label="计数器">
    <a-switch />
  </action-row>
  <action-row label="清除按钮">
    <a-switch />
  </action-row>
  <action-row label="自动清除头尾空字符" label-width="120">
    <a-switch />
  </action-row>

  <global-collapse v-model:activeKey="activeNames" ghost expand-icon-position="right">
    <a-collapse-panel key="rules" header="校验">
      <action-row label="必填">
        <a-checkbox />
      </action-row>

      <action-row label="最小长度">
        <global-input />
      </action-row>

      <action-row label="最大长度">
        <global-input />
      </action-row>

      <action-row label="正则表达式">
        <regexp-parity-select />
      </action-row>
    </a-collapse-panel>
  </global-collapse>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { Props as Value } from './interface';

interface Props {
  value?: Value;
}

const props = withDefaults(defineProps<Props>(), { value: () => ({}) });

const emit = defineEmits(['update:value']);

const dataItem = useVModel(props, 'value', emit);

// 展开的标签
const activeNames = ref('rules');

const states = [
  { label: '普通', value: 'default' },
  { label: '只读', value: 'readonly' },
  { label: '禁用', value: 'disabled' }
];

const types = [
  { label: '正文', value: 'text' },
  { label: '密码', value: 'password' }
];

const labelAligns = [
  { label: '左', value: 'left' },
  { label: '上', value: 'top' },
  { label: '内', value: 'inner' }
];
</script>
