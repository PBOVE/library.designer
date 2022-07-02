<template>
  <action-row label="内边距" :is-value="!!padding.value || placeholder === '自定义'">
    <unit-input-number v-model:value="padding.value" :placeholder="placeholder" @change="hadnleValueChange" />

    <template #overlay>
      <action-row label="上间距" label-width="70px" :is-value="!!padding.top">
        <unit-input-number v-model:value="padding.top" placeholder="默认" @change="hadnlePaddingChange" />
      </action-row>

      <action-row label="右间距" label-width="70px" :is-value="!!padding.right">
        <unit-input-number v-model:value="padding.right" placeholder="默认" @change="hadnlePaddingChange" />
      </action-row>

      <action-row label="下间距" label-width="70px" :is-value="!!padding.bottom">
        <unit-input-number v-model:value="padding.bottom" placeholder="默认" @change="hadnlePaddingChange" />
      </action-row>

      <action-row label="左间距" label-width="70px" :is-value="!!padding.left">
        <unit-input-number v-model:value="padding.left" placeholder="默认" @change="hadnlePaddingChange" />
      </action-row>
    </template>
  </action-row>
</template>

<script lang="ts" setup>
interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), { value: '' });

const emit = defineEmits(['update:value']);

const padding = reactive({ value: '', top: '', right: '', bottom: '', left: '' });

const placeholder = ref('默认');

// 内部更新不触发
let isValueUpdateFromInner = false;

function updateValue(value: string) {
  isValueUpdateFromInner = true;

  emit('update:value', value);
}

function hadnlePaddingChange() {
  const { top, left, bottom, right } = padding;

  if (top || right || bottom || left) {
    if (top === left && top === bottom && top === right) {
      padding.value = top;

      updateValue(padding.value);
    } else {
      padding.value = '';

      placeholder.value = '自定义';

      updateValue(`${top || 0} ${right || 0} ${bottom || 0} ${left || 0}`);
    }
  } else {
    placeholder.value = '默认';

    updateValue(padding.value);
  }
}

function updatePadding(top: string, right: string, bottom: string, left: string) {
  padding.top = top;

  padding.right = right;

  padding.bottom = bottom;

  padding.left = left;
}

function hadnleValueChange() {
  updatePadding(padding.value, padding.value, padding.value, padding.value);

  updateValue(padding.value);
}

watch(
  () => props.value,
  () => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else {
      const reslut = props.value.split(' ');

      if (reslut.length === 1) {
        const [value] = reslut;

        updatePadding(value, value, value, value);
      } else if (reslut.length === 4) {
        const [top, right, bottom, left] = reslut;

        updatePadding(top, right, bottom, left);
      }
    }
  }
);
</script>

<style lang="less" module></style>
