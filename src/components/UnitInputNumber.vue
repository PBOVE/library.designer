<template>
  <a-input
    v-model:value="inputValue"
    :placeholder="placeholder"
    :class="$style['wrap']"
    :readonly="readonly === true || inputValue === 'auto'"
    @change="onInputChange"
  >
    <template #suffix>
      <a-tooltip v-model:visible="visible" :overlay-class-name="$style.overlay" placement="bottomRight">
        <div :class="$style.suffix">{{ selectUnit || '-' }}</div>

        <template v-if="options.length > 1" #title>
          <div
            v-for="(item, index) in options"
            :key="index"
            :class="$style['dropdown-item']"
            @click="handleSelectUnit(item)"
          >
            {{ item.label }}
          </div>
        </template>
      </a-tooltip>
    </template>
  </a-input>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash';

interface Props {
  value?: string;

  defaultValue?: string;

  placeholder?: string;

  readonly?: boolean;

  options?: { label: string; value: string }[];
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  defaultValue: '',
  placeholder: '请输入',
  options: () => [
    { label: 'px', value: 'px' },
    { label: '%', value: '%' },
    { label: 'auto', value: '-' }
  ]
});

const emit = defineEmits(['update:value', 'change']);

const selectUnit = ref<string>('');

// 内部更新不触发
let isValueUpdateFromInner = false;

const visible = ref<boolean>(false);

// 输入的内容
const inputValue = ref<string>('');

const onInputChange = () => {
  isValueUpdateFromInner = true;

  if (inputValue.value !== 'auto') {
    inputValue.value = inputValue.value.replace(/[^0-9]/g, '');

    if (inputValue.value) {
      inputValue.value = `${Number(inputValue.value)}`;
    }
  }

  const value = inputValue.value || props.defaultValue;

  const unit = Number(value) ? selectUnit.value : '';

  emit('update:value', value ? `${value}${unit}` : '');

  emit('change');
};

// 处理选中的单位
function handleSelectUnit(record: { label: string; value: string }) {
  if (inputValue.value === 'auto') {
    inputValue.value = '';
  }

  if (record.label === 'auto') {
    inputValue.value = 'auto';
  }

  selectUnit.value = record.value;

  visible.value = false;

  onInputChange();
}

watch(
  () => props.value,
  () => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else if (/^(\d+)?(px|%|auto)$/.test(props.value) || isEmpty(props.value)) {
      const [, value, unit] = props.value.match(/^(\d+)?(px|%|auto)$/) ?? ['', '', props.options[0].value];

      inputValue.value = unit === 'auto' ? unit : value;

      selectUnit.value = unit === 'auto' ? '-' : unit;
    } else {
      inputValue.value = props.value;
    }
  },
  { immediate: true }
);
</script>

<style lang="less" module>
.suffix {
  min-width: 20px;
  height: 20px;
  padding: 0 3px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  background-color: #f1f1f1;
}

.wrap {
  .ant-input-affix-wrapper {
    display: flex;
  }
}

.overlay {
  :global {
    .ant-tooltip-arrow {
      display: none;
    }

    .ant-tooltip-inner {
      width: 80px;
      padding: 5px 0;
      background: #fff;
    }
  }
}

.dropdown-item {
  height: 25px;
  padding: 0 11px;
  line-height: 25px;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #409eff1a;
  }
}
</style>
