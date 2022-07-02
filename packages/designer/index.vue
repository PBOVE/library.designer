<template>
  <div :class="[$style['wrap'], 'bg-light-350']">
    <dnd-provider :backend="HTML5Backend">
      <!-- 头部 -->
      <div :class="[$style['header'], 'flex-between', 'items-center']">
        <div class="fs-20">
          <slot name="title"></slot>
        </div>
        <!-- 快捷操作 -->
        <div class="flex-between">
          <a-button>预览</a-button>
          <a-button type="primary" class="ml-10">保存</a-button>
        </div>
      </div>

      <!-- 左侧物料 -->
      <area-material />

      <!-- 视图 -->
      <area-view>
        <template #default="record">
          <slot name="view" v-bind="record"></slot>
        </template>
      </area-view>

      <!-- 右侧属性配置面板 -->
      <area-action />
    </dnd-provider>
  </div>
</template>

<script lang="ts" setup>
import type { Page, Schema, TemplateTree, Contenxt } from '#/editor';
import { DndProvider } from 'vue3-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cloneDeep, isNull, set } from 'lodash';
import useContext from '@/hooks/useContext';
import AreaMaterial from './src/AreaMaterial.vue';
import AreaView from './src/AreaView.vue';
import AreaAction from './src/AreaAction.vue';

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

  set: (record: Schema) => {
    selectWidget.value = record;
  },

  update: (key: keyof Schema, value: Schema[keyof Schema]) => {
    console.log(key, value);
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

<style lang="less" module>
.wrap {
  display: grid;
  grid-template-rows: 54px 1fr;
  grid-template-columns: 320px 1fr 400px;
  width: 100%;
  height: 100%;
}

.header {
  grid-column-start: 1;
  grid-column-end: 4;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}

@media screen and (max-width: 1800px) {
  .wrap {
    grid-template-columns: 320px 1fr 330px;
  }
}
</style>
