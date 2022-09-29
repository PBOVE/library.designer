<template>
  <transition name="b-collapse-transition" v-on="on">
    <slot></slot>
  </transition>
</template>
<script lang="ts" setup>
import type { RendererElement } from 'vue';

const on = {
  beforeEnter(element: RendererElement) {
    const el = element;

    if (!el.dataset) el.dataset = {};

    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  enter(element: RendererElement) {
    const el = element;

    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = null;
    }

    el.style.paddingTop = null;
    el.style.paddingBottom = null;

    el.style.overflow = 'hidden';
  },

  afterEnter(element: RendererElement) {
    const el = element;

    el.style.height = '';
    el.style.overflow = null;
  },

  beforeLeave(element: RendererElement) {
    const el = element;

    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },

  leave(element: RendererElement) {
    const el = element;

    if (el.scrollHeight !== 0) {
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  afterLeave(element: RendererElement) {
    const el = element;

    el.style.height = null;
    el.style.overflow = null;
    el.style.paddingTop = null;
    el.style.paddingBottom = null;
  }
};
</script>

<style>
.b-collapse-transition-enter-active {
  box-sizing: content-box;
}

.b-collapse-transition-leave-active,
.b-collapse-transition-enter-active {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}
</style>
