<template>
  <div :ref="setElement" class="bc-drop">
    <drop-card
      v-for="(item, index) in dataSource"
      :key="item.id"
      v-element-hover="(state: boolean) => handleNodeHover(state, item)"
      :schema="item"
      :index="index"
      class="bc-drop-container"
      :style="handelWidgetStyle(item)"
      @move="hadnleMoveSchema"
      @append="handleAppendSchema"
      @click.stop="handleClickTemeplate(item)"
      @change="handleDropChange"
    >
      <!-- 视图 -->
      <slot v-bind="item"></slot>
      <!-- 悬浮层 -->
      <div v-if="dragging.id === item.id && dragging.state" class="bc-dragging-mask"></div>

      <div
        class="bc-widget-mask"
        :class="{
          'is-hover': hoverId === item.id && !dragging.state,
          'is-selected': selectId === item.id && !dragging.state
        }"
      ></div>

      <!-- 操作 -->
      <div v-if="selectId === item.id && !dragging.state" ref="actions" class="bc-borders-actions" :style="actionStyle">
        <div class="bc-borders-action">{{ item.label }}</div>
        <div class="bc-borders-divider"></div>
        <icon type="charm:copy" class="bc-borders-action" />
        <div class="bc-borders-divider"></div>
        <icon type="ep:delete" class="bc-borders-action" @click.stop="handleClickDelete(index)" />
      </div>
    </drop-card>

    <!-- 空状态 -->
    <div v-if="isEmptyContainer" class="bc-empty-placeholder" :class="{ 'bc-empty-enter': isMouseEnter }">
      拖拽组件到这里
    </div>

    <!-- 分割线 -->
    <div v-if="isOver && !isEmptyContainer" class="bc-drop-divider"></div>
  </div>
</template>

<script lang="ts" setup name="AreaContainer">
import type { Schema, Contenxt } from '#/editor';
import type { TemplateData } from '~/compile/utils/index';
import type { CSSProperties } from 'vue';
import { useDrop } from 'vue3-dnd';
import { isEmpty, isArray, kebabCase } from 'lodash-es';
import { useVModel } from '@vueuse/core';
import { vElementHover } from '@vueuse/components';
import { move } from '@/utils';
import useContext from '@/hooks/useContext';
import { buildSchema } from '~/compile/utils/index';
import DropCard from './DropCard.vue';

interface Props {
  list: Schema[];
}

interface AppendContext {
  targetI: number;

  target?: Schema;

  data: Schema;

  isDown: boolean;
}

interface MoveContext {
  sourceI: number;

  targetI: number;

  data: Schema;

  isDown?: boolean;

  target?: Schema;
}

interface MoveSchema {
  id: string;

  originalIndex: number;

  schema: Schema;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['update:list', 'change']);

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema, hoverSchema } = useInject();

const selectWidget = computed(() => selectSchema.get());

const selectId = computed(() => unref(selectWidget)?.id);

const hoverId = computed(() => hoverSchema.get()?.id);

const dragging = reactive({ state: false, id: '' });

const dataSource = useVModel(props, 'list', emit);

const actionStyle = ref<CSSProperties>({});

const actions = ref<HTMLNULL>(null);

// 处理添加模型
function handleAppendSchema(context: AppendContext) {
  const { targetI, target, data, isDown } = context;
  if (isArray(target?.children)) {
    // 是容器
  } else {
    dataSource.value.splice(targetI + (isDown ? 1 : 0), 0, buildSchema(data));
  }
}

//  处理移动模型
function hadnleMoveSchema(context: MoveContext) {
  const { sourceI, targetI, isDown = false, target, data } = context;

  selectSchema.set(data);

  if (sourceI === targetI) return;

  if (isArray(target?.children)) {
    // 是容器
  } else {
    move(dataSource.value, sourceI, targetI + (isDown ? 1 : 0));
  }
}
// 点击
function handleClickTemeplate(record: Schema) {
  selectSchema.set(record);
}
// 删除
function handleClickDelete(index: number) {
  dataSource.value.splice(index, 1);

  selectSchema.set(null);
}
// 悬浮
function handleNodeHover(state: boolean, record: Schema) {
  hoverSchema.set(state ? record : null);
}

const [collect, drop] = useDrop({
  accept: 'PageDesigner',
  drop: (item: TemplateData | MoveSchema, monitor) => {
    const didDrop = monitor.didDrop(); // returns false for direct drop target
    if (didDrop) {
      return;
    }

    if ((item as MoveSchema).id) {
      const sourceI = (item as MoveSchema).originalIndex;

      const { schema } = item as MoveSchema;
      // 移动数据
      hadnleMoveSchema({ sourceI, targetI: dataSource.value.length, data: schema });
    } else {
      // 没有 id 就是新增
      const schema = buildSchema(item as TemplateData);
      // 新增数据
      dataSource.value.push(schema);

      handleClickTemeplate(schema);
    }

    emit('change');
  },
  collect: (monitor) => ({
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  })
});
// 是否空数据
const isEmptyContainer = computed(() => isEmpty(dataSource.value));
// 拖拽
const isOver = computed(() => collect.value.isOver);
// 拖拽是否进入
const isMouseEnter = computed(() => !!(collect.value.canDrop && isOver.value));
// 设置 dom
const setElement = (el: HTMLNULL) => drop(el);

function handleDropChange(value: boolean, schema: Schema) {
  dragging.state = value;

  dragging.id = schema.id;
}

function handelWidgetStyle(schema: Schema) {
  const result = Object.entries(schema.__style__[':root'] || {});

  return result.reduce((total, [key, value]) => `${total} ${kebabCase(key)}: ${value};`, '');
}

function handleActionUpdate() {
  const clientWidth = document.querySelector('.bc-borders-actions')?.clientWidth || 0;

  const width = parseFloat(selectWidget.value?.__style__[':root']?.width as string);

  actionStyle.value = clientWidth > width ? { right: 'auto', left: 0 } : {};
}

watch(
  () => selectWidget.value?.__style__[':root']?.width,
  () => nextTick(handleActionUpdate)
);
</script>

<style lang="less">
.bc-drop {
  width: 100%;
  height: 100%;
}

.bc-drop-container {
  position: relative;
  white-space: nowrap;
}

.bc-widget-mask {
  position: absolute;
  inset: 0;
  pointer-events: none;

  &.is-hover {
    border: 1px dashed @primary-color;
    background: #197aff10;
  }

  &.is-selected {
    border: 2px solid @primary-color;
  }
}

.bc-dragging-mask {
  position: absolute;
  inset: 0;
  background: fade(#595959, 40);
}

.bc-empty {
  &-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 60px;
    border: 1px dotted;
    color: #a7b1bd;
    background-color: #f0f0f0;
  }

  &-enter {
    background-color: #eff6ff;
  }
}

.bc-drop-divider {
  outline: 1px solid @primary-color;
}

.bc-borders-actions {
  position: absolute;
  right: 0;
  bottom: 1px;
  z-index: 10;
  padding: 1px 0;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  background-color: @primary-color;
  transform: translateY(100%);

  .flex-y-center();
}

.bc-borders-action {
  margin: 0 8px;
  cursor: pointer;
}

.bc-borders-divider {
  width: 1px;
  height: 10px;
  background: #fff;
}
</style>
