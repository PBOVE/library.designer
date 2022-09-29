<template>
  <action-row label="外边距" :is-value="margin">
    <unit-input-number v-model:value="margin.value" :placeholder="placeholder" @change="hadnleValueChange" />

    <template #overlay>
      <action-row label="上间距" label-width="70px" :is-value="margin.top">
        <unit-input-number v-model:value="margin.top" placeholder="默认" @change="hadnleMarginChange" />
      </action-row>

      <action-row label="右间距" label-width="70px" :is-value="margin.right">
        <unit-input-number v-model:value="margin.right" placeholder="默认" @change="hadnleMarginChange" />
      </action-row>

      <action-row label="下间距" label-width="70px" :is-value="margin.bottom">
        <unit-input-number v-model:value="margin.bottom" placeholder="默认" @change="hadnleMarginChange" />
      </action-row>

      <action-row label="左间距" label-width="70px" :is-value="margin.left">
        <unit-input-number v-model:value="margin.left" placeholder="默认" @change="hadnleMarginChange" />
      </action-row>
    </template>
  </action-row>
</template>

<script lang="ts" setup>
interface Props {
  value?: string | number;
}

const props = withDefaults(defineProps<Props>(), { value: '' });

const emit = defineEmits(['update:value']);

const margin = reactive({ value: '', top: '', right: '', bottom: '', left: '' });

const placeholder = ref('默认');

function updateValue(value: string) {
  emit('update:value', value);
}

function hadnleMarginChange() {
  const { top, left, bottom, right } = margin;

  if (top || right || bottom || left) {
    if (top === left && top === bottom && top === right) {
      margin.value = top;

      updateValue(margin.value);
    } else {
      margin.value = '';

      placeholder.value = '自定义';

      updateValue(`${top || 0} ${right || 0} ${bottom || 0} ${left || 0}`);
    }
  } else {
    placeholder.value = '默认';

    updateValue(margin.value);
  }
}

function updateMargin(top: string, right: string, bottom: string, left: string) {
  margin.top = top;

  margin.right = right;

  margin.bottom = bottom;

  margin.left = left;
}

function hadnleValueChange() {
  updateMargin(margin.value, margin.value, margin.value, margin.value);

  updateValue(margin.value);
}

watch(
  () => props.value,
  () => {
    const reslut = String(props.value).split(' ');

    if (reslut.length === 1) {
      const [value] = reslut;

      updateMargin(value, value, value, value);
    } else if (reslut.length === 4) {
      const [top, right, bottom, left] = reslut;

      updateMargin(top, right, bottom, left);
    }
  },
  { immediate: true }
);
</script>
