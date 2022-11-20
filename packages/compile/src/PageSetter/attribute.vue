<template>
  <b-collapse-divider title="页面内容设置" />

  <global-collapse v-model:activeKey="activeNames" ghost expand-icon-position="right">
    <a-collapse-panel key="lifecycle" header="生命周期">
      <div class="bc-block-field">
        <b-collapse-divider title="页面加载完成时" />
        <div class="bc-field-body">
          <a-button type="primary" class="bc-action-button">绑定动作</a-button>
        </div>
      </div>

      <div class="bc-block-field">
        <b-collapse-divider title="页面关闭时" />
        <div class="bc-field-body">
          <a-button type="primary" class="bc-action-button">绑定动作</a-button>
        </div>
      </div>
    </a-collapse-panel>
  </global-collapse>
</template>

<script lang="ts" setup>
// 展开的标签
const activeNames = ref('lifecycle');
</script>

<style lang="less">
.bc-block-field {
  padding: 12px;
}

.bc-field-body {
  padding: 12px;
}

.bc-action-button {
  width: 100%;
}
</style>
