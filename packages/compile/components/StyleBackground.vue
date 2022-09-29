<template>
  <action-row label="背景" label-class="!w-full" :is-value="styleBackground">
    <template #overlay>
      <!-- 填充图 -->
      <action-row label-width="30px" :is-value="styleData.backgroundColor">
        <template #label>
          <icon type="ant-design:bg-colors-outlined" size="20" />
        </template>

        <b-color-picker v-model:value="styleData.backgroundColor" />
      </action-row>

      <action-row label-width="30px" :is-value="styleData.backgroundImage">
        <template #label>
          <icon type="ant-design:file-image-outlined" size="20" />
        </template>

        <image-input-upload v-model:value="styleData.backgroundImage" />
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

const propertyPath = ['backgroundColor', 'backgroundImage'];

const styleBackground = computed(() => pick(styleData.value, propertyPath));
</script>
