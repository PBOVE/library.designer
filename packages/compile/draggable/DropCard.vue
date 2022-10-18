<template>
  <div :ref="setElement">
    <div v-if="isOver && !positionDown" class="bc-drop-divider"></div>
    <slot></slot>
    <div v-if="isOver && positionDown" class="bc-drop-divider"></div>
  </div>
</template>

<script lang="ts" setup>
import type { Schema } from '#/editor';
import { useDrag, useDrop } from 'vue3-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface Props {
  index: number;

  schema: Schema;
}

interface MoveSchema {
  id: string;

  originalIndex: number;

  schema: Schema;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['append', 'move', 'change']);

const wrapRef = ref<HTMLNULL>(null);

const positionDown = ref<boolean>(true);

const [collectByDrag, drag, connectDragPreview] = useDrag(() => ({
  type: 'PageDesigner',
  item: () => ({ id: props.schema.id, label: props.schema.label, originalIndex: props.index, schema: props.schema }),
  collect: (monitor) => ({
    isDragging: monitor.isDragging()
  })
}));

connectDragPreview(getEmptyImage());

const [collectByDrop, drop] = useDrop(() => ({
  accept: 'PageDesigner',
  drop: (item: Schema | MoveSchema, monitor) => {
    if (monitor.didDrop()) {
      return;
    }

    // item: 被移动数据
    // schema：当前数据

    const context = { target: props.schema, targetI: props.index, isDown: positionDown.value };

    // 没有id 是新增,有id是移动
    if (!item.id) {
      emit('append', { ...context, data: item });
    } else {
      const { originalIndex, schema } = item as MoveSchema;

      emit('move', { ...context, sourceI: originalIndex, data: schema });
    }
  },
  hover(_, monitor) {
    const didHover = monitor.isOver({ shallow: true });

    if (!didHover || !wrapRef.value) {
      return;
    }

    const hoverBoundingRect = wrapRef.value.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    if (clientOffset) {
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY <= hoverMiddleY) {
        positionDown.value = false;
      }

      if (hoverClientY > hoverMiddleY) {
        positionDown.value = true;
      }
    }
  },
  collect: (monitor) => ({
    isOver: monitor.isOver({ shallow: true })
  })
}));

const isOver = computed(() => collectByDrop.value.isOver);

const isDragging = computed(() => collectByDrag.value.isDragging);

const setElement = (el: HTMLNULL) => {
  drag(drop(el));

  wrapRef.value = el;
};

watch(
  () => isDragging.value,
  (value) => emit('change', value, props.schema)
);
</script>

<style lang="less">
.bc-drop-divider {
  outline: 1px solid @primary-color;
}
</style>
