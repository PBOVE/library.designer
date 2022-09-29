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

      <!-- 物料 -->
      <area-left />

      <!-- 视图 -->
      <area-main>
        <template #default="record">
          <slot name="view" v-bind="record"></slot>
        </template>
      </area-main>

      <!-- 设置器 -->
      <area-right />
    </dnd-provider>
  </div>
</template>

<script lang="ts" setup>
import type { Page, Schema, TemplateTree, Contenxt } from '#/editor';
import { DndProvider } from 'vue3-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cloneDeep, isNull, set } from 'lodash-es';
import useContext from '@/hooks/useContext';
import areaLeft from './areaLeft.vue';
import areaMain from './areaMain.vue';
import areaRight from './areaRight.vue';

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

useProvide({ templateTree: props.templateTree, onInstance, selectSchema });

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
  display: grid;
  grid-template-rows: 54px 1fr;
  grid-template-columns: 320px 1fr 400px;
  width: 100%;
  height: 100%;
}

.bc-header {
  grid-column-start: 1;
  grid-column-end: 4;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);

  .flex-y-center();
  .justify-between();

  &-left {
    font-size: 20px;
  }
}

.bc-button {
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
}

@media screen and (max-width: 1800px) {
  .bc-wrap {
    grid-template-columns: 320px 1fr 330px;
  }
}
</style>
