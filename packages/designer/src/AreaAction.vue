<template>
  <div :class="$style['wrap']">
    <!-- 选中当前数据 -->
    <a-tabs v-if="schemaId">
      <a-tab-pane key="first" tab="属性">User</a-tab-pane>
      <a-tab-pane key="style" tab="样式">
        <action-style />
      </a-tab-pane>
      <a-tab-pane key="third" tab="高级">Role</a-tab-pane>

      <template #rightExtra>
        <div :class="$style['breadcrumb']">
          <div class="text-[#b9babb]">页面</div>
          <icon type="ep:arrow-right" class="mx-8" />
          <div>{{ schemaLabel }}</div>
        </div>
      </template>
    </a-tabs>

    <!-- 空 -->
    <div v-else class="mt-50 px-15 text-center text-zinc-600">请在左侧画布选中节点</div>
  </div>
</template>

<script lang="ts" setup>
import type { Contenxt } from '#/editor';
import useContext from '@/hooks/useContext';
import Icon from '@/components/Icon.vue';
import ActionStyle from './ActionStyle.vue';

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema } = useInject();

const schemaId = computed(() => selectSchema.get()?.id);

const schemaLabel = computed(() => selectSchema.get()?.label);
</script>

<style lang="less" module>
.wrap {
  background: #fff;

  :global {
    .ant-tabs-nav-list {
      display: flex;
      width: 100%;
    }

    .ant-tabs-tab {
      display: flex;
      flex: 1;
      justify-content: center;
      height: 36px;
      margin: 0 !important;
      font-weight: 400;
      line-height: 36px;
    }

    .ant-tabs-nav {
      display: block !important;
      margin-bottom: 0 !important;

      &::before {
        border-width: 0 !important;
      }
    }

    .ant-tabs-tabpane {
      height: calc(100vh - 120px);
      overflow: auto;
    }
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
  cursor: default;
}
</style>
