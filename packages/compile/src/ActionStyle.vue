<template>
  <global-collapse v-model:activeKey="activeNames" ghost expand-icon-position="right">
    <a-collapse-panel key="setting" header="样式设置">
      <action-row label="状态" divider>
        <global-select v-model:value="styleState" class="w-full" :options="stateOptions" />
      </action-row>

      <action-row label="宽" :is-value="styleData.width" divider>
        <unit-input-number v-model:value="styleData.width" :placeholder="canvas.width" />
      </action-row>

      <action-row label="高" :is-value="styleData.height" divider>
        <unit-input-number v-model:value="styleData.height" :placeholder="canvas.height" />
      </action-row>

      <style-display v-model:value="styleData.display" />

      <style-margin v-model:value="styleData.margin" />

      <style-padding v-model:value="styleData.padding" />

      <style-font v-model:value="styleData" />

      <style-background v-model:value="styleData" />

      <style-border v-model:value="styleData" />

      <style-shadow v-model:value="styleData.boxShadow" />

      <action-row label="不透明度" :is-value="styleData.opacity" divider>
        <unit-input-number v-model:value="styleData.opacity" :options="[{ label: '%', value: '%' }]" />
      </action-row>

      <action-row label="鼠标手势" :is-value="styleData.cursor" divider>
        <global-select v-model:value="styleData.cursor" :options="[{ value: 'default' }, { value: 'pointer' }]" />
      </action-row>
    </a-collapse-panel>
  </global-collapse>
</template>

<script lang="ts" setup>
import type { Contenxt } from '#/editor';
import type { CSSProperties } from 'vue';
import { debounce } from 'lodash';
import useContext from '@/hooks/useContext';
import { addResizeListener, removeResizeListener } from '@/utils/dom/event';
import StyleBackground from '~/compile/components/StyleBackground.vue';
import StyleBorder from '~/compile/components/StyleBorder.vue';
import StyleDisplay from '~/compile/components/StyleDisplay.vue';
import StyleFont from '~/compile/components/StyleFont.vue';
import StyleMargin from '~/compile/components/StyleMargin.vue';
import StylePadding from '~/compile/components/StylePadding.vue';
import StyleShadow from '~/compile/components/StyleShadow.vue';
import { canvasId } from '~/compile/constant';

// 展开的标签
const activeNames = ref('setting');
// 样式状态
const styleState = ref(':root');
//
const styleData = ref<CSSProperties>({});

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema } = useInject();

const styleSchema = computed(() => selectSchema.get()?.__style__[styleState.value] || {});

const canvas = reactive({ width: '', height: '' });

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

// 获取画布数据
function getCanvasData() {
  const { width = 0, height = 0 } = document.querySelector(`.${canvasId}`)?.getBoundingClientRect() || {};

  canvas.width = `${width}`;

  canvas.height = `${height}`;
}

onMounted(() => addResizeListener(document.querySelector(`.${canvasId}`), getCanvasData));

onUnmounted(() => removeResizeListener(document.querySelector(`.${canvasId}`), getCanvasData));
</script>
