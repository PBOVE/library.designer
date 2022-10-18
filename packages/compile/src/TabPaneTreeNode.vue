<template>
  <div class="bc-tree-node">
    <div v-for="item in list" :key="item.id">
      <div
        class="bc-tree-node-text"
        :class="{ 'is-select': item.id === schemaId }"
        :style="{ paddingLeft: `${level * 12}px` }"
        @click="handleClickTemeplate(item)"
      >
        <div class="bc-tree-node-expand-btn">
          <icon v-if="item.children?.length" type="ep:arrow-down" />
        </div>
        <span>{{ item.label }}</span>
      </div>

      <div v-if="item.children?.length" class="bc-tree-node-branches">
        <tab-pane-tree-node :list="item.children" :level="level + 1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Schema, Contenxt } from '#/editor';
import useContext from '@/hooks/useContext';

interface Props {
  list: Schema[];

  level?: number;
}

const { useInject } = useContext<Contenxt>('PageDesigner');

const { selectSchema } = useInject();

defineOptions({ name: 'TabPaneTreeNode' });

const props = withDefaults(defineProps<Props>(), { list: () => [], level: 1 });

const schemaId = computed(() => selectSchema.get()?.id);

const left = computed(() => `${props.level * 12 + 6}px`);

function handleClickTemeplate(record: Schema) {
  selectSchema.set(record);
}
</script>

<style lang="less">
.bc-tree-node-branches {
  position: relative;

  &::before {
    position: absolute;
    left: v-bind(left);
    width: 1px;
    height: 100%;
    background: #e7e7e8;
    content: '';
  }
}

.bc-tree-node-text {
  min-height: 30px;
  padding: 0 5px;
  font-size: 12px;
  color: var(--color-text);
  cursor: pointer;

  .flex-y-center();

  &.is-select {
    background-color: var(--color-block-background-dark);

    &:hover {
      background-color: var(--color-block-background-dark);
    }
  }

  &:hover {
    background-color: var(--color-block-background-light);
  }
}

.bc-tree-node-expand-btn {
  width: 12px;
  margin-right: 5px;

  .flex-y-center();
}
</style>
