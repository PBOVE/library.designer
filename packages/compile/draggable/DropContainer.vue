<template>
  <div :ref="setElement" class="bc-drop">
    <drop-card
      v-for="(item, index) in dataSource"
      :key="item.id"
      :schema="item"
      :index="index"
      class="bc-drop-container"
      :class="{ 'is-selected': selectSchemaId === item.id }"
      @move="hadnleMoveSchema"
      @append="handleAppendSchema"
      @click="handleClickTemeplate(item)"
    >
      <slot v-bind="item"></slot>

      <div v-if="selectSchemaId === item.id" class="bc-borders-actions">
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
    <!-- <div v-if="isOver && !isEmptyContainer" :class="$style.divider"></div> -->
  </div>
</template>

<script lang="ts" setup name="AreaContainer">
import type { Schema, Contenxt } from '#/editor';
import { useDrop } from 'vue3-dnd';
import { isEmpty, isArray } from 'lodash-es';
import { move } from '@/utils';
import { buildSchemId } from '@/utils/uuid';
import useContext from '@/hooks/useContext';
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

const emit = defineEmits(['update:list', 'select', 'delete']);

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema } = useInject();

const selectSchemaId = computed(() => selectSchema.get()?.id);

const dataSource = computed({
  get: () => props.list,
  set: (value) => emit('update:list', value)
});

// 构建数据
const buildSchem = (data: Schema) => ({ ...data, __style__: {}, props: {}, id: buildSchemId(data.name) });

// 处理添加模型
function handleAppendSchema(context: AppendContext) {
  const { targetI, target, data, isDown } = context;
  if (isArray(target?.children)) {
    // 是容器
  } else {
    dataSource.value.splice(targetI + (isDown ? 1 : 0), 0, buildSchem(data));
  }
}

//  处理移动模型
function hadnleMoveSchema(context: MoveContext) {
  const { sourceI, targetI, isDown = false, target } = context;

  if (sourceI === targetI) return;

  if (isArray(target?.children)) {
    // 是容器
  } else {
    move(dataSource.value, sourceI, targetI + (isDown ? 1 : 0));
  }
}

const [collect, drop] = useDrop({
  accept: 'PageDesigner',
  drop: (item: Schema | MoveSchema, monitor) => {
    const didDrop = monitor.didDrop(); // returns false for direct drop target
    if (didDrop) {
      return;
    }

    // 没有 id 就是新增
    if (!item.id) {
      const schema = buildSchem(item as Schema);
      // 新增数据
      dataSource.value.push(schema);
    } else {
      const sourceI = (item as MoveSchema).originalIndex;

      const { schema } = item as MoveSchema;

      // 移动数据
      hadnleMoveSchema({ sourceI, targetI: dataSource.value.length, data: schema });
    }
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

function handleClickTemeplate(record: Schema) {
  emit('select', record);
}

function handleClickDelete(index: number) {
  emit('delete', index);
}
</script>

<style lang="less">
.bc-drop {
  width: 100%;
  height: 100%;
}

.bc-drop-container {
  position: relative;

  &:hover {
    outline: 1px dashed @primary-color;
    outline-offset: -1px;
    background: #197aff10;
  }

  &.is-selected {
    outline: 2px solid @primary-color;
    outline-offset: -2px;
  }
}

.bc-empty {
  &-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px dotted;
    color: #a7b1bd;
    background-color: #f0f0f0;
  }

  &-enter {
    background-color: #eff6ff;
  }
}

.divider {
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
