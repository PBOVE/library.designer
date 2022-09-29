<template>
  <div :ref="setElement">
    <div v-if="isOver && !positionDown" :class="$style.divider"></div>
    <slot></slot>
    <div v-if="isOver && positionDown" :class="$style.divider"></div>
  </div>
</template>

<script lang="ts" setup>
import type { Schema } from '#/editor';
import { useDrag, useDrop } from 'vue3-dnd';

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

const emit = defineEmits(['append', 'move']);

const wrapRef = ref<HTMLNULL>(null);

const positionDown = ref<boolean>(true);

const [, drag] = useDrag(() => ({
  type: 'PageDesigner',
  item: () => ({ id: props.schema.id, originalIndex: props.index, schema: props.schema }),
  collect: (monitor) => ({
    isDragging: monitor.isDragging()
  })
}));

const [collect, drop] = useDrop(() => ({
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

const isOver = computed(() => collect.value.isOver);

const setElement = (el: HTMLNULL) => {
  drag(drop(el));

  wrapRef.value = el;
};
</script>

<style lang="less" module>
.divider {
  outline: 1px solid @primary-color;
}
</style>
