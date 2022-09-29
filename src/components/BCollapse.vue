<template>
  <a-collapse class="b-collapse">
    <slot></slot>
  </a-collapse>
</template>

<style lang="less">
.b-collapse.ant-collapse {
  .ant-collapse-item {
    .ant-collapse-header {
      position: sticky;
      top: 0;
      z-index: 100;
      align-items: center;
      height: 32px;
      padding: 0 12px 0;
      border-bottom: 1px solid #f0f0f0;
      background-color: #f2f3f5;
      user-select: none;
    }

    .ant-collapse-content {
      .ant-collapse-content-box {
        padding: 0;
      }
    }
  }
}
</style>
