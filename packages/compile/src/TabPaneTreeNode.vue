<template>
  <div
    v-if="level === 1"
    class="bc-tree-node-text"
    :class="{ 'is-select': isUndefined(selectId) }"
    :style="{ paddingLeft: '10px' }"
    @click="handleClickTemeplate(null)"
  >
    <span> 页面</span>
  </div>

  <div :class="{ 'bc-tree-node-branches': level === 1 }" :style="{ '--branches-left': '6px' }">
    <div v-for="item in list" :key="item.id">
      <!-- 节点展示信息 -->
      <div
        v-element-hover="(state: boolean) => handleNodeHover(state, item)"
        class="bc-tree-node-text"
        :class="{ 'is-select': item.id === selectId, 'is-hover': item.id === hoverId }"
        :style="{ paddingLeft: `${level * 18}px` }"
        @click.stop="handleClickTemeplate(item)"
      >
        <div class="bc-tree-node-expand-btn">
          <icon
            v-if="item.children?.length"
            type="ep:arrow-down"
            :rotate="activeKeys[item.id] || isUndefined(activeKeys[item.id]) ? 0 : -180"
            @click="handleClickCollapse(item)"
          />
        </div>
        <span>{{ item.label }}</span>
      </div>
      <!-- 子节点 -->
      <b-collapse-transition>
        <div
          v-if="item.children?.length"
          v-show="activeKeys[item.id] || isUndefined(activeKeys[item.id])"
          class="bc-tree-node-branches"
          :style="{ '--branches-left': left }"
        >
          <tab-pane-tree-node :list="item.children" :level="level + 1" />
        </div>
      </b-collapse-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Schema, Contenxt } from '#/editor';
import { isBoolean, isUndefined } from 'lodash';
import { vElementHover } from '@vueuse/components';
import useContext from '@/hooks/useContext';

interface Props {
  list: Schema[];

  level?: number;
}

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema, hoverSchema } = useInject();

defineOptions({ name: 'TabPaneTreeNode' });

const props = withDefaults(defineProps<Props>(), { list: () => [], level: 1 });

const selectId = computed(() => selectSchema.get()?.id);

const hoverId = computed(() => hoverSchema.get()?.id);

const left = computed(() => `${props.level * 18 + 6}px`);

const activeKeys = ref<Indexable<boolean>>({});

function handleNodeHover(state: boolean, record: Schema) {
  hoverSchema.set(state ? record : null);
}

function handleClickTemeplate(record: Schema | null) {
  selectSchema.set(record);
}

function handleClickCollapse(record: Schema) {
  const result = activeKeys.value[record.id];

  activeKeys.value[record.id] = isBoolean(result) ? !activeKeys.value[record.id] : false;
}
</script>

<style lang="less">
.bc-tree-node-branches {
  position: relative;
}

.bc-tree-node-text {
  min-height: 30px;
  padding: 0 5px;
  font-size: 12px;
  color: var(--color-text);
  cursor: pointer;

  .flex-y-center();

  &.is-hover {
    background-color: var(--color-block-background-light);
  }

  &.is-select {
    background-color: var(--color-block-background-dark);
  }
}

.bc-tree-node-expand-btn {
  width: 12px;
  margin-right: 5px;

  .flex-y-center();
}
</style>
