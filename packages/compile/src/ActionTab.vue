<template>
  <div class="bc-right-tabs">
    <div class="bc-right-tabs-nav">
      <div
        v-for="(item, index) in options"
        :key="item.name"
        class="bc-right-tabs-tab"
        :class="{ 'bc-right-tabs-tab__active': selected === item.name }"
        @click="handleSwitchTab(item, index)"
      >
        <div>{{ item.label }}</div>
      </div>
    </div>

    <div class="bc-right-tabs-ink-bar" :style="{ transform: transform.bar }"></div>
  </div>

  <div class="bc-settings-extra">
    <div>页面</div>
    <template v-if="schemaLabel">
      <icon type="ep:arrow-right" class="mx-8" />
      <div>{{ schemaLabel }}</div>
    </template>
  </div>

  <div class="bc-settings-content">
    <div v-for="item in options" v-show="selected === item.name" :key="item.name">
      <slot v-bind="{ record: item }"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Contenxt } from '#/editor';
import useContext from '@/hooks/useContext';

interface Props {
  options: { label: string; name: string; [key: string]: unknown }[];
}

const props = withDefaults(defineProps<Props>(), { options: () => [] });

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema } = useInject();

// const schemaId = computed(() => selectSchema.get()?.id);

const schemaLabel = computed(() => selectSchema.get()?.label);

const transform = reactive({ bar: '' });

const selected = ref<string>(props.options?.[0].name);

const width = computed(() => `${100 / props.options.length}%`);

function handleSwitchTab(record: { name: string }, index: number) {
  selected.value = record.name;

  transform.bar = `translate3d(${index * 100}%, 0, 0)`;
}

watch(
  () => props.options,
  () => {
    // 重新设置
    const result = props.options?.[0];

    result && handleSwitchTab(result, 0);
  }
);
</script>

<style lang="less">
.bc-right-tabs-nav {
  display: flex;
  align-items: center;
  height: 36px;
  text-align: center;
}

.bc-right-tabs {
  position: relative;
}

.bc-right-tabs-tab {
  flex: 1;
  cursor: pointer;

  &__active {
    color: var(--text-color);
  }
}

.bc-right-tabs-ink-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: v-bind(width);
  height: 2px;
  border-radius: 2px;
  background: @primary-color;
  transition-duration: 0.3s;
}

.bc-settings-extra {
  display: flex;
  height: 30px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 12px;
  line-height: 30px;
}

.bc-settings-content {
  flex: 1;
  height: 0;
  overflow: auto;
}
</style>
