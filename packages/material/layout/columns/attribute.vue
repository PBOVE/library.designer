<template>
  <b-collapse-divider title="布局" />

  <action-row label="列布局">
    <a-input placeholder="请输入" />

    <template #reminder> 请严格按照格式输入，每一行可用 12 格，支持多行 </template>
  </action-row>

  <action-row label="列间距">
    <unit-input-number placeholder="请输入" />
  </action-row>

  <action-row label="行间距">
    <unit-input-number placeholder="请输入" />
  </action-row>
</template>

<script lang="ts" setup></script>
