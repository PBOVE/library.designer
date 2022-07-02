<template>
  <a-collapse v-model:activeKey="activeNames" :class="$style['wrap']" ghost expand-icon-position="right">
    <template #expandIcon="{ isActive }">
      <div>
        <icon type="ep:arrow-down" :rotate="isActive ? -180 : 0" />
      </div>
    </template>

    <a-collapse-panel key="setting" header="样式设置">
      <action-row label="状态">
        <global-select v-model:value="styleState" class="w-full" :options="stateOptions" />
      </action-row>

      <action-row label="宽">
        <unit-input-number v-model:value="styleData.width" />
      </action-row>

      <action-row label="高">
        <unit-input-number v-model:value="styleData.height" />
      </action-row>

      <style-display v-model:value="styleData.display" />

      <style-margin v-model:value="styleData.margin" />

      <style-padding v-model:value="styleData.padding" />

      <style-font v-model:value="styleData" />

      <style-background />

      <style-border />

      <style-shadow />

      <action-row label="不透明度">
        <unit-input-number :options="[{ label: '%', value: '%' }]" />
      </action-row>

      <action-row label="鼠标手势">
        <!-- <global-select>
          <a-option label="默认状态" />
          <a-option label=":hover" />
          <a-option label=":focus" />
          <a-option label=":active" />
        </global-select> -->
      </action-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import type { Contenxt } from '#/editor';
import type { CSSProperties } from 'vue';
import { debounce } from 'lodash';
import useContext from '@/hooks/useContext';
// 展开的标签
const activeNames = ref('setting');
// 样式状态
const styleState = ref(':root');
//
const styleData = ref<CSSProperties>({});

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema } = useInject();

const styleSchema = computed(() => selectSchema.get()?.__style__[styleState.value] || {});

// 内部更新不触发
let isValueUpdateFromInner = false;

// 外部更新不触发
let isValueUpdateFromOuter = false;

const UpdateValueUpdateFromInner = debounce((value) => {
  isValueUpdateFromInner = value;
}, 300);

const UpdateValueUpdateFromOuter = debounce((value) => {
  isValueUpdateFromOuter = value;
}, 300);

watch(
  () => styleSchema.value,
  (value) => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else {
      isValueUpdateFromOuter = true;

      styleData.value = value;

      UpdateValueUpdateFromOuter(false);
    }
  },
  { immediate: true }
);

watch(
  () => styleData.value,
  (value) => {
    console.log('1');
    if (isValueUpdateFromOuter) {
      isValueUpdateFromOuter = false;
    } else {
      isValueUpdateFromInner = true;

      selectSchema.update(`__style__.${styleState.value}`, value);

      UpdateValueUpdateFromInner(false);
    }
  },
  { deep: true }
);

// 状态列表
const stateOptions = [
  { label: '默认状态', value: ':root' },
  { label: ':hover', value: ':root:hover' },
  { label: ':focus', value: ':root:focus' },
  { label: ':active', value: ':root:active' }
];
</script>

<style lang="less" module>
.wrap {
  :global {
    .ant-collapse-header {
      position: sticky !important;
      top: 0;
      z-index: 100;
      align-items: center !important;
      height: 32px;
      padding: 0 12px 0 !important;
      border-bottom: 1px solid #f0f0f0;
      background-color: #f2f3f5;
      user-select: none;
    }

    .ant-collapse-content-box {
      padding: 0 !important;
    }
  }
}
</style>
