<template>
  <div class="bc-workbench">
    <div class="bc-toolbar">
      <!-- 模拟器 -->
      <div class="bc-simulator">
        <div
          class="bc-simulator-button"
          :class="{ 'is-actived': layoutType === 'pc' }"
          @click="handleClickSimulator('pc')"
        >
          <icon type="clarity:computer-line" size="18" />
        </div>

        <div
          class="bc-simulator-button"
          :class="{ 'is-actived': layoutType === 'h5' }"
          @click="handleClickSimulator('h5')"
        >
          <icon type="clarity:mobile-line" size="18" />
        </div>
      </div>

      <!-- 历史 -->
      <div class="bc-history">
        <div class="bc-history-button">
          <icon type="clarity:undo-line" size="16" />
        </div>

        <div class="bc-history-button">
          <icon type="clarity:redo-line" size="16" />
        </div>

        <div class="bc-history-button bc-button" @click="handleClickHistory">
          <icon type="ion:time-outline" size="18" />
        </div>
      </div>

      <!-- 快捷 -->
      <div class="bc-quick-search">
        <div class="bc-quick-search-button bc-button">
          <icon type="clarity:search-line" size="16" />
        </div>

        <div class="bc-quick-search-button bc-button" @click="handleClickKeyboard">
          <icon type="clarity:keyboard-line" size="18" />
        </div>
      </div>

      <div class="bc-page-setting-button" :class="{ 'is-actived': !schemaId }" @click="handleClickPageSetting">
        页面属性
      </div>
    </div>

    <div class="bc-main-area">
      <div :class="[canvasId, `bc-simulator-${layoutType}`]">
        <drop-container v-model:list="widgetTree" class="bc-compile">
          <template #default="record">
            <slot v-bind="record"></slot>
          </template>
        </drop-container>
      </div>
    </div>

    <!-- 修改历史查看 -->
    <history-drawer v-model:value="visible.history" />

    <!-- 快捷键 -->
    <shortcuts-modal v-model:value="visible.keyboard" />
  </div>
</template>

<script lang="ts" setup>
import type { Contenxt, Schema } from '#/editor';
import useContext from '@/hooks/useContext';
import HistoryDrawer from '../components/HistoryDrawer.vue';
import ShortcutsModal from '../components/ShortcutsModal.vue';
import { DropContainer } from '../draggable';
import { canvasId } from '../constant';

type LayoutType = 'pc' | 'h5';

const { useInject } = useContext<Contenxt>('PageDesigner');

const { onInstance, selectSchema } = useInject();

const widgetTree = computed({
  get: () => onInstance.get('widgetTree'),
  set: (value: Schema[]) => onInstance.set('widgetTree', value)
});

const schemaId = computed(() => selectSchema.get()?.id);

const visible = reactive({ history: false, keyboard: false });

const layoutType = ref<LayoutType>('pc');

function handleClickSimulator(type: LayoutType) {
  layoutType.value = type;
}

function handleClickHistory() {
  visible.history = true;
}

function handleClickKeyboard() {
  visible.keyboard = true;
}

function handleClickPageSetting() {
  selectSchema.set(null);
}
</script>

<style lang="less">
.bc-workbench {
  display: flex;
  flex-direction: column;
}

.bc-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 36px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
}

.bc-main-area {
  flex: 1;
  height: 0;
  padding: 16px;
  background-color: #edeff3;
}

.bc-simulator {
  display: flex;
  align-items: center;

  &-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 0 4px;
    border-radius: 3px;
    cursor: pointer;

    &.is-actived {
      background: #f1f2f3;
    }
  }

  &-canvas {
    height: 100%;
    overflow: auto;
    background: #f2f3f5;
    box-shadow: 0 1px 4px 0 rgb(31 50 88 / 13%);
  }

  &-h5 {
    width: 375px;
    margin: 0 auto;
  }

  &-pc {
    width: auto;
  }
}

.bc-history {
  display: flex;
  align-items: center;
  padding-right: 16px;
  border-right: 1px solid #edeff3;
  border-left: 1px solid #edeff3;

  &-button {
    display: flex;
    align-items: center;
    margin-left: 16px;
    cursor: pointer;
  }
}

.bc-quick-search {
  display: flex;
  align-items: center;
  padding-right: 16px;
  border-right: 1px solid #edeff3;

  &-button {
    display: flex;
    align-items: center;
    margin-left: 16px;
    cursor: pointer;
  }
}

.bc-page-setting-button {
  padding: 0 16px;
  font-size: 12px;
  cursor: pointer;

  &.is-actived {
    color: @primary-color;
  }
}
</style>
