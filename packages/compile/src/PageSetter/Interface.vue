<template>
  <b-collapse-divider title="数据初始化接口" />

  <action-row label="发送方式">
    <global-select :options="sendOptions" />
  </action-row>

  <action-row label="请求地址">
    <a-textarea :auto-size="{ minRows: 3, maxRows: 3 }" />
  </action-row>

  <b-collapse-divider title="请求参数" />

  <div class="bc-interface-params">
    <icon type="ant-design:holder-outlined" size="16" class="cursor-move" />

    <div class="bc-interface-params-body">项目</div>

    <div class="bc-interface-params-icons">
      <div class="bc-button bc-interface-params-icon">
        <icon type="ant-design:form-outlined" />
      </div>

      <div class="bc-button bc-interface-params-icon">
        <icon type="ant-design:delete-outlined" />
      </div>
    </div>
  </div>

  <a-button type="primary" class="bc-interface-add">添加一项</a-button>

  <b-collapse-divider title="数据处理" />
</template>

<script lang="ts" setup>
const sendOptions = [
  { value: 'get', label: 'GET' },
  { value: 'post', label: 'POST' },
  { value: 'put', label: 'PUT' },
  { value: 'patch', label: 'PATCH' },
  { value: 'delete', label: 'DELETE' }
];
</script>

<style lang="less">
.bc-interface-params {
  height: 32px;
  padding: 0 4px;
  margin: 10px 10px 8px;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  font-size: 12px;

  .items-center();
  .justify-between();
}

.bc-interface-params-title {
  margin: 10px;
  color: var(--text-color);
}

.bc-interface-params-body {
  flex: 1;
  margin: 0 5px;
}

.bc-interface-params-icons {
  font-size: 16px;
  cursor: pointer;

  .flex-y-center();
}

.bc-interface-params-icon {
  &:not(:last-child) {
    margin-right: 8px;
  }

  .flex-y-center();
}

.bc-interface-add {
  width: calc(100% - 20px);
  margin: 10px;
}
</style>
