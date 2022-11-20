<template>
  <action-row label="文字" label-class="!w-full" :is-value="styleFont" divider>
    <template #overlay>
      <div class="grid grid-cols-[1fr,121px] gap-x-10">
        <action-row label="粗细" label-width="30px" :is-value="styleData.fontWeight">
          <global-select v-model:value="styleData.fontWeight" :options="weightOptions" placeholder="400 normal" />
        </action-row>

        <action-row label="样式" label-width="30px" :is-value="styleData.fontStyle">
          <a-radio-group v-model:value="styleData.fontStyle" class="flex">
            <a-radio-button value="normal"> 默认 </a-radio-button>
            <a-radio-button value="italic"> 斜体 </a-radio-button>
          </a-radio-group>
        </action-row>
      </div>

      <action-row label="颜色" label-width="30px" :is-value="styleData.color">
        <b-color-picker v-model:value="styleData.color" />
      </action-row>

      <div class="grid grid-cols-2 gap-x-10">
        <action-row label="大小" label-width="30px" :is-value="styleData.fontSize">
          <unit-input-number
            v-model:value="styleData.fontSize"
            placeholder="14"
            default-value="14"
            :options="fontOptions"
          />
        </action-row>

        <action-row label="行高" label-width="30px" :is-value="styleData.lineHeight">
          <unit-input-number
            v-model:value="styleData.lineHeight"
            placeholder="18"
            default-value="18"
            :options="fontOptions"
          />
        </action-row>
      </div>

      <action-row label="对齐" label-width="30px" class="text-center" :is-value="styleData.textAlign">
        <a-radio-group v-model:value="styleData.textAlign" class="!flex w-full">
          <a-radio-button value="left" class="flex-1"> 居左 </a-radio-button>
          <a-radio-button value="center" class="flex-1"> 居中 </a-radio-button>
          <a-radio-button value="right" class="flex-1"> 居右 </a-radio-button>
        </a-radio-group>
      </action-row>

      <action-row label="修饰" label-width="30px" class="text-center" :is-value="styleData.textDecoration">
        <a-radio-group v-model:value="styleData.textDecoration" class="!flex w-full">
          <a-radio-button value="normal" class="flex-1"> 默认 </a-radio-button>
          <a-radio-button value="underline" class="flex-1"> 下划线 </a-radio-button>
          <a-radio-button value="line-through" class="flex-1"> 删除线 </a-radio-button>
          <a-radio-button value="overline" class="flex-1"> 上划线 </a-radio-button>
        </a-radio-group>
      </action-row>
    </template>
  </action-row>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { pick } from 'lodash-es';

interface Props {
  value?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), { value: () => ({}) });

const emit = defineEmits(['update:value']);

const styleData = computed({
  get: () => props.value,
  set: (value) => emit('update:value', value)
});

const propertyPath = ['fontWeight', 'fontStyle', 'color', 'fontSize', 'lineHeight', 'textAlign', 'textDecoration'];

const styleFont = computed(() => pick(styleData.value, propertyPath));

const weightOptions = [
  { label: '100 Thin', value: '100' },
  { label: '200 Extra Light', value: '200' },
  { label: '300 Light', value: '300' },
  { label: '400 normal', value: '400' },
  { label: '500 medium', value: '500' },
  { label: '600 semibold', value: '600' },
  { label: '700 bold', value: '700' },
  { label: '800 extrabold', value: '800' },
  { label: '900 black', value: '900' }
];
const fontOptions = [
  { label: '更随系统', value: '' },
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'em', value: 'em' }
];
</script>
