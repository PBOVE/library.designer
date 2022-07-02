<template>
  <a-tabs tab-position="left" :class="$style['tabs']">
    <a-tab-pane v-for="item in tabPanes" :key="item.name" class="h-full">
      <!-- 侧边栏 -->
      <template #tab>
        <a-tooltip placement="right" :title="item.title">
          <icon :type="item.icon" size="20" color="rgba(0,0,0,0.6)" />
        </a-tooltip>
      </template>

      <div class="flex flex-col h-full">
        <!-- 标题 -->
        <div class="flex-y-center h-48 fs-16 pl-15">
          {{ item.title }}
        </div>

        <!-- 内容 -->
        <component :is="item.name" />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import TabPaneTemplate from './TabPaneTemplate.vue';
import TabPaneTree from './TabPaneTree.vue';

export default defineComponent({
  components: { TabPaneTemplate, TabPaneTree }
});
</script>

<script lang="ts" setup>
const tabPanes = [
  { title: '组件库', name: 'TabPaneTemplate', icon: 'ant-design:appstore-outlined' },
  { title: '大纲树', name: 'TabPaneTree', icon: 'carbon:tree-view' }
];
</script>

<style lang="less" module>
.tabs {
  background-color: #fff;

  :global {
    .ant-tabs-tab {
      width: 50px;
      height: 42px;
      padding: 8px 15px !important;
    }

    .ant-tabs-nav {
      padding-top: 19px;
    }

    .ant-tabs-ink-bar {
      transition: height 0.3s, top 0.3s;
    }

    .ant-tabs-tabpane {
      padding-left: 0 !important;
    }
  }
}
</style>
