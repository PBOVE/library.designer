<template>
  <div class="bc-left-tabs">
    <div class="bc-left-tabs-wrap">
      <div ref="nav" class="bc-left-tabs-nav">
        <div
          v-for="item in options"
          :key="item.name"
          class="bc-left-tabs-tab"
          :class="{ 'bc-left-tabs-tab__active': selected === item.name }"
          @click="handleSwitchTab(item)"
        >
          <icon :type="item.icon" size="20" />
        </div>

        <div class="bc-left-tabs-ink-bar" :style="{ transform: transform.bar }"></div>
      </div>

      <div></div>
    </div>

    <div ref="instance" class="bc-left-tabs-content">
      <div class="bc-left-tabs__track">
        <div class="bc-left-slider-block" :style="{ marginTop: transform.track }"></div>
        <div v-for="item in options" :key="item.name" class="bc-left-tabs-tabpane">
          <div class="bc-left-tabs-title">{{ item.title }}</div>
          <component :is="item.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TabPaneTemplate from './TabPaneTemplate.vue';
import TabPaneTree from './TabPaneTree.vue';
import TabPaneModule from './TabPaneModule.vue';
import TabPaneDatabase from './TabPaneDatabase.vue';

export default defineComponent({
  components: { TabPaneTemplate, TabPaneTree, TabPaneModule, TabPaneDatabase }
});
</script>

<script lang="ts" setup>
const options = [
  { title: '组件库', name: 'TabPaneTemplate', icon: 'ant-design:appstore-outlined' },
  { title: '区块模块', name: 'TabPaneModule', icon: 'ant-design:gold-outlined' },
  { title: '数据源', name: 'TabPaneDatabase', icon: 'ant-design:database-outlined' },
  { title: '大纲树', name: 'TabPaneTree', icon: 'carbon:tree-view' }
];

const selected = ref<string>(options[0].name);

const nav = ref<HTMLNULL>(null);

const instance = ref<HTMLNULL>(null);

const transform = reactive({ bar: '', track: '' });

const currentIndex = computed(() => {
  const index = options.findIndex((el) => el.name === unref(selected));

  return Math.max(index, 0);
});

function setUnderlineIndex() {
  const element = nav.value?.querySelector('.bc-left-tabs-tab__active') as HTMLElement;

  const { offsetTop = 0, clientHeight = 0 } = element || {};

  transform.bar = `translate3d(0, ${offsetTop + clientHeight / 2 - 10}px, 0)`;

  transform.track = `-${currentIndex.value * (instance.value?.clientHeight || 0)}px`;
}

function handleSwitchTab(record: { name: string }) {
  selected.value = record.name;

  nextTick(setUnderlineIndex);
}

onMounted(setUnderlineIndex);
</script>

<style lang="less">
.bc-left-tabs {
  display: flex;
  border-right: 1px solid var(--border-color);
}

.bc-left-tabs-nav {
  position: relative;
}

.bc-left-tabs-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  border-right: 1px solid var(--border-color);
}

.bc-left-tabs-tab {
  flex-direction: column;
  width: 50px;
  padding: 13px 0;
  cursor: pointer;
  .flex-center();

  &-title {
    margin-top: 8px;
    font-size: 12px;
  }

  &__active {
    color: @primary-color;
  }
}

.bc-left-tabs-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bc-left-tabs-tabpane {
  width: 100%;
  height: 100%;
}

.bc-left-tabs-ink-bar {
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 20px;
  border-radius: 2px;
  background: @primary-color;
  transition-duration: 0.3s;
}

.bc-left-tabs__track {
  width: 100%;
  height: 100%;
  transition-duration: 0.3s;
}

.bc-left-tabs-title {
  height: 48px;
  padding: 0 15px;
  font-size: 16px;
  color: var(--text-color);
  .flex-y-center();
}

.bc-left-slider-block {
  transition: margin 0.3s ease-in-out;
}
</style>
