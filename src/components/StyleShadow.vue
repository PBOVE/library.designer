<template>
  <action-row label="阴影">
    <global-select class="w-full" :options="options" />

    <template #overlay>
      <action-row label="颜色" label-width="70px">
        <global-select class="w-full" :options="options" />
      </action-row>
      <action-row label="X 轴位移" label-width="70px">
        <unit-input-number />
      </action-row>
      <action-row label="Y 轴位移" label-width="70px">
        <unit-input-number />
      </action-row>
      <action-row label="模糊半径" label-width="70px">
        <unit-input-number />
      </action-row>
      <action-row label="扩展半径" label-width="70px">
        <unit-input-number />
      </action-row>
    </template>
  </action-row>
</template>

<script lang="ts" setup>
const options = [
  { value: 0, label: '大' },
  { value: 1, label: '中' },
  { value: 2, label: '小' },
  { value: 3, label: '无' },
  { value: 4, label: '默认' },
  { value: 5, label: '自定义' }
];
</script>
