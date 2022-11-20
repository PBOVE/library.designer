<template>
  <div class="bc-wrap">
    <dnd-provider :backend="HTML5Backend">
      <!-- 头部 -->
      <div class="bc-header">
        <div class="bc-header-left">
          <slot name="title"></slot>
        </div>
        <!-- 快捷操作 -->
        <div class="bc-header-right">
          <a-button>预览</a-button>
          <a-button type="primary" class="ml-10">保存</a-button>
        </div>
      </div>

      <div class="bc-main">
        <!-- 物料 -->
        <area-left class="bc-main-left" />

        <!-- 视图 -->
        <area-main class="bc-main-container">
          <template #default="data">
            <slot name="view" v-bind="data"></slot>
          </template>
        </area-main>

        <!-- 设置器 -->
        <area-right class="bc-main-right">
          <template #default="data">
            <slot name="setter" v-bind="data"></slot>
          </template>
        </area-right>
      </div>

      <!-- 自定义拖拽层 -->
      <drag-layer />
    </dnd-provider>
  </div>
</template>

<script lang="ts" setup>
import type { Page, Schema, TemplateTree, Contenxt } from '#/editor';
import { DndProvider } from 'vue3-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cloneDeep, isNull, set } from 'lodash-es';
import useContext from '@/hooks/useContext';
import AreaLeft from './src/AreaLeft.vue';
import AreaMain from './src/AreaMain.vue';
import AreaRight from './src/AreaRight.vue';
import { DragLayer } from './draggable';

interface Props {
  // 模版树
  templateTree: TemplateTree[];

  // 页面数据
  page: Page;
}

const props = withDefaults(defineProps<Props>(), {
  templateTree: () => [],
  page: () => ({ widgetTree: [] })
});

const emit = defineEmits(['update:page']);

const pageData = ref<Page>(cloneDeep(props.page));

// 内部更新不触发
let isValueUpdateFromInner = false;

const selectWidget = ref<Schema | null>(null);

const hoverWidget = ref<Schema | null>(null);

const { useProvide } = useContext<Contenxt>('PageDesigner');

// 获取页面数据
const onInstance = {
  get: (key: keyof Page) => pageData.value[key],
  set: (key: keyof Page, value: Page[keyof Page]) => {
    isValueUpdateFromInner = true;

    pageData.value[key] = value;

    emit('update:page', cloneDeep(pageData.value));
  }
};

const selectSchema = {
  get: () => selectWidget.value,

  set: (record: Schema | null) => {
    selectWidget.value = record;
  },

  update: (key: keyof Schema, value: Schema[keyof Schema]) => {
    if (isNull(selectWidget.value)) return;

    set(selectWidget.value, key, value);
  }
};

const hoverSchema = {
  get: () => hoverWidget.value,

  set: (record: Schema | null) => {
    hoverWidget.value = record;
  }
};

useProvide({ templateTree: props.templateTree, onInstance, selectSchema, hoverSchema });

watch(
  () => props.page,
  () => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else {
      pageData.value = cloneDeep(props.page);
    }
  },
  { deep: true }
);
</script>

<style lang="less">
.bc-wrap {
  display: flex;
  flex-direction: column;
}

.bc-header {
  height: 54px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);

  .flex-y-center();
  .justify-between();

  &-left {
    font-size: 20px;
  }
}

.bc-main {
  display: flex;
  flex: 1;
  height: 0;
}

.bc-main-left {
  flex-shrink: 0;
  width: 320px;
}

.bc-main-container {
  flex: 1;
  width: 0;
}

.bc-main-right {
  flex-shrink: 0;
  width: 320px;
}

.bc-button {
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
</style>
