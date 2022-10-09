<template>
  <div :visible="visible" :divider="divider" :class="$style['wrap']">
    <div>
      <div :class="$style['container']" :type="type">
        <div
          :class="[$style['label'], labelClass, overlay && 'cursor-pointer']"
          :style="{ width }"
          @click="handleOpenCollapse"
        >
          <icon
            v-if="overlay"
            type="ant-design:caret-right-filled"
            :rotate="visible ? 90 : 0"
            :class="$style['icon']"
          />
          <div :class="[isTitleAction && $style['field-title'], $style['label-title']]">
            <slot name="label">{{ label }}</slot>
          </div>
        </div>

        <div :class="$style['main']">
          <slot></slot>
        </div>
      </div>

      <div :class="$style['reminder']">
        <slot name="reminder"></slot>
      </div>
    </div>

    <b-collapse-transition>
      <div v-if="overlay" v-show="visible" :class="[$style['overlay'], overlayClass]">
        <slot name="overlay"></slot>
      </div>
    </b-collapse-transition>
  </div>
</template>

<script lang="ts" setup>
import { isArray, isEmpty, isObject } from 'lodash-es';

interface Props {
  // label 标签的文本
  label?: string;
  // label 标签的样式
  labelClass?: string;
  // label 标签的宽度
  labelWidth?: string;
  // 是否为 有效数据
  isValue?: boolean | string | Array<unknown> | { [key: string]: unknown };
  // 弹出层样式
  overlayClass?: string;
  // 分割线
  divider?: boolean;
  // 展示类型
  type?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelClass: '',
  overlayClass: '',
  labelWidth: '80px',
  isValue: () => false,
  divider: true,
  type: 'horizontal'
});

const width = computed(() => (props.type === 'horizontal' ? props.labelWidth : ''));

const visible = ref<boolean>(false);

const isTitleAction = computed(() => {
  // 数组判断每一个 key
  if (isArray(props.isValue)) {
    return props.isValue.some((el) => !isEmpty(el));
  }
  // 数组判断每一个 value
  if (isObject(props.isValue)) {
    return Object.values(props.isValue).some((el) => !isEmpty(el));
  }
  // 判断是否空
  return !isEmpty(props.isValue);
});

const overlay = computed(() => !!useSlots().overlay);

function handleOpenCollapse() {
  if (overlay.value) {
    // 存在插槽，在更新
    visible.value = !visible.value;
  }
  //
}
</script>

<style lang="less" module>
.wrap {
  margin: 0 20px;
  color: var(--text-color);

  &[visible='true'] {
    border-color: transparent;
  }

  &[divider='true'] + .wrap[divider='true'] {
    border-top: 1px solid #f0f0f0;
  }
}

.container {
  min-height: 44px;
  padding: 7px 0 4px;

  &[type='horizontal'] {
    display: flex;
    align-items: center;

    .main {
      flex: 1;
      width: 0;
    }
  }

  &[type='vertical'] {
    display: flex;
    flex-direction: column;
  }
}

.icon {
  margin-right: 4px;
  font-size: 10px;
}

.label {
  flex-shrink: 0;
  height: 100%;
  font-size: 12px;
  user-select: none;

  .flex-y-center();
}

.label-title {
  height: 32px;

  .flex-center();
}

.reminder {
  padding-bottom: 4.7px;
  font-size: 12px;
  color: #999;
  zoom: 0.84;
}

.overlay {
  padding: 10px 10px 10px 20px;
  margin: 0 -10px 0 -10px;
  background-color: rgba(31, 56, 88, 0.04);

  .wrap {
    margin: 0;
    border-width: 0;
  }
}

.field-title {
  color: @primary-color;
}
</style>
