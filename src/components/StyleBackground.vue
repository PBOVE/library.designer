<template>
  <action-row label="背景">
    <template #overlay>
      <!-- 填充图 -->
      <action-row label-width="30px">
        <template #label>
          <icon type="ant-design:bg-colors-outlined" size="20" />
        </template>

        <color-picker />
      </action-row>

      <action-row label-width="30px">
        <template #label>
          <icon type="ant-design:file-image-outlined" size="20" />
        </template>

        <image-input-upload />
      </action-row>
    </template>
  </action-row>
</template>
