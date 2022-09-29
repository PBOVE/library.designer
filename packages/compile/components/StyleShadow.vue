<template>
  <action-row label="阴影" label-class="!w-full" :is-value="value">
    <template #overlay>
      <action-row label="颜色" label-width="70px" :is-value="boxShadow.color">
        <b-color-picker v-model:value="boxShadow.color" @change="handleBoxShadowChange" />
      </action-row>
      <action-row label="X 轴位移" label-width="70px" :is-value="boxShadow.hShadow">
        <unit-input-number v-model:value="boxShadow.hShadow" :options="unitOptions" @change="handleBoxShadowChange" />
      </action-row>
      <action-row label="Y 轴位移" label-width="70px" :is-value="boxShadow.vShadow">
        <unit-input-number v-model:value="boxShadow.vShadow" :options="unitOptions" @change="handleBoxShadowChange" />
      </action-row>
      <action-row label="模糊半径" label-width="70px" :is-value="boxShadow.blur">
        <unit-input-number v-model:value="boxShadow.blur" :options="unitOptions" @change="handleBoxShadowChange" />
      </action-row>
      <action-row label="扩展半径" label-width="70px" :is-value="boxShadow.spread">
        <unit-input-number v-model:value="boxShadow.spread" :options="unitOptions" @change="handleBoxShadowChange" />
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

const boxShadow = ref({ hShadow: '', vShadow: '', blur: '', spread: '', color: '' });

const unitOptions = [
  { label: '更随系统', value: '' },
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'em', value: 'em' }
];

function handleBoxShadowChange() {
  const { hShadow, vShadow, blur, spread, color = '' } = unref(boxShadow);

  const reslut = `${hShadow} ${vShadow} ${blur || ''} ${spread || ''} ${color}`;

  emit('update:value', reslut);
}

watch(
  () => props.value,
  (value) => {
    const [color = ''] = /(rgba?\([^)]+\))|(#[\dabcdef]+)/gi.exec(value) || [];

    const [hShadow = '', vShadow = '', blur = '', spread = ''] = value.replace(color, '').split(' ');

    boxShadow.value = { hShadow, vShadow, blur, spread, color };
  },
  { immediate: true }
);
</script>
