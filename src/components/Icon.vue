<template>
  <i ref="instance" :class="$style['icon']" :style="wrapStyle"></i>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import Iconify from '@purge-icons/generated';

interface Props {
  // 图标的名称
  type: string;
  // 大小
  size?: number | string;
  // 颜色
  color?: string;
  // 旋转
  rotate?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  size: undefined,
  color: '',
  rotate: 0
});

const instance = ref<HTMLNULL>();

const update = () => {
  const el = unref(instance);
  if (el) {
    const { type } = props;
    const svg = Iconify.renderSVG(type, {});

    if (svg) {
      el.textContent = '';
      el.appendChild(svg);
    } else {
      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = type;
      el.textContent = '';
      el.appendChild(span);
    }
  }
};

const wrapStyle = computed((): CSSProperties => {
  const { size, color, rotate } = props;

  return {
    color,
    transform: `rotate(${rotate}deg)`,
    'font-size': `${size && parseInt(size.toString(), 10)}px`
  };
});

onMounted(update);

watch(() => props.type, update);
</script>

<style lang="less" module>
.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}
</style>
