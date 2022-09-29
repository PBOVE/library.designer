<template>
  <div class="bc-database-header">
    <a-button type="primary" @click="handleClickAddParams">添加</a-button>
  </div>

  <database-remote v-model:value="visible.remote" />
</template>

<script lang="ts" setup>
import DatabaseRemote from '../components/DatabaseRemote.vue';

const visible = reactive({ remote: false });

function handleClickAddParams() {
  visible.remote = true;
}
</script>

<style lang="less">
.bc-database-header {
  padding: 0 12px;
  margin: 8px 0 0;
}
</style>
