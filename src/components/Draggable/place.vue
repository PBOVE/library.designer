<template>
  <div ref="container" class="ui-draggable-place" @mousedown.prevent="startMove($event)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { clamp, throttle } from 'lodash-es';

export default defineComponent({
  props: {
    isSize: {
      // 是否可以改变大小
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['on-move', 'on-end', 'on-start', 'on-resize'],
  setup(props, { emit }) {
    const container = ref<Element | null>(null);
    // 开始移动 节流
    const startThrottle = throttle((data) => emit('on-start', data), 20);
    // 移动中 节流
    const moveThrottle = throttle((data) => emit('on-move', data), 20);
    // 开始移动 节流
    const endThrottle = throttle((data) => emit('on-end', data), 20);

    // 确定位置
    function spotting(pageX: number, pageY: number) {
      const containerWidth = (container.value as Element).clientWidth;
      const containerHeight = (container.value as Element).clientHeight;

      const rect = (container.value as Element).getBoundingClientRect();

      const xOffset = rect.left + window.pageXOffset;
      const yOffset = rect.top + window.pageYOffset;

      const x = clamp(pageX - xOffset, 0, containerWidth);
      const y = clamp(pageY - yOffset, 0, containerHeight);

      return { x, y, container: { height: containerHeight, width: containerWidth } };
    }

    // 拖拽移动事件
    function moving(event: MouseEvent) {
      const result = spotting(event.pageX, event.pageY);

      moveThrottle({ record: props.record, ...result });
    }

    // 拖拽结束事件
    function endMove(event: MouseEvent) {
      const result = spotting(event.pageX, event.pageY);

      endThrottle({ record: props.record, ...result });

      // 移除移动事件 鼠标抬起事件
      document.removeEventListener('mousemove', moving);
      document.removeEventListener('mouseup', endMove);
    }

    // 鼠标按下
    function startMove(event: MouseEvent) {
      // 判断鼠标按键
      if (event.button !== 0) return;

      const result = spotting(event.pageX, event.pageY);
      // 设置移动事件 鼠标抬起事件
      document.addEventListener('mousemove', moving, false);
      document.addEventListener('mouseup', endMove, false);

      startThrottle({ record: props.record, ...result });
    }

    return { container, startMove };
  }
});
</script>

<style lang="less">
.ui-draggable-place {
  position: absolute;

  .ew {
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(315deg);
    cursor: ew-resize;
  }

  .ns {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    cursor: ns-resize;
  }

  .se {
    right: 0;
    bottom: 0;
    cursor: se-resize;
  }

  .size {
    width: 5px;
    height: 5px;
    border-right: 2px solid rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  }
}
</style>
