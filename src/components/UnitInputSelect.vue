<template>
  <a-dropdown v-model:visible="visible" trigger="click" :class="$style['wrap']" :get-popup-container="popupContainer">
    <a-input readonly :placeholder="placeholder">
      <template #suffix>
        <icon type="ep:arrow-down" size="12" color="rgba(0, 0, 0, 0.25)" />
      </template>
    </a-input>

    <template #overlay>
      <div :class="$style['overlay']">
        <div v-for="(item, index) in options" :key="index" :class="$style['overlay-item']">
          {{ item.label }}
        </div>

        <div class="px-5 pt-5">
          <unit-input-number class="h-28" />
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
interface Option {
  label: string;

  value: string;
}

interface props {
  options: Option[];

  placeholder?: string;
}

withDefaults(defineProps<props>(), { placeholder: '' });

const popupContainer = (trigger: HTMLElement) => trigger;

const visible = ref<boolean>(false);
</script>

<style lang="less" module>
.overlay {
  width: 100%;
  padding: 5px 0;
  background: #fff;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;

  &-item {
    padding: 5px 11px;
    padding: 5px 12px;
    font-weight: normal;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;

    &:hover {
      background: #409eff1a;
    }
  }
}

.wrap {
  :global {
    .ant-dropdown {
      width: 100%;
    }

    .ant-input {
      cursor: pointer;
    }
  }
}
</style>
