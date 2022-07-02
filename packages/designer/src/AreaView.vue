<template>
  <div :class="$style['wrap']">
    <div :class="$style['header']"></div>

    <div :class="$style['main']">
      <drop-container v-model:list="widgetTree" item-key="id" @select="selectSchema.set">
        <template #default="record">
          <slot v-bind="record"></slot>
        </template>
      </drop-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Contenxt, Schema } from '#/editor';
import useContext from '@/hooks/useContext';
import { DropContainer } from '../draggable';

const { useInject } = useContext<Contenxt>('PageDesigner');

const { onInstance, selectSchema } = useInject();

const widgetTree = computed({
  get: () => onInstance.get('widgetTree'),
  set: (value: Schema[]) => onInstance.set('widgetTree', value)
});
</script>

<style lang="less" module>
.wrap {
  display: flex;
  flex-direction: column;
}

.header {
  height: 36px;
  border: 1px solid #f0f0f0;
  border-top-width: 0;
  background: #fff;
}

.main {
  flex: 1;
  margin: 16px;
  background: #f2f3f5;
  box-shadow: 0 1px 4px 0 rgba(31, 50, 88, 0.13);
}
</style>
