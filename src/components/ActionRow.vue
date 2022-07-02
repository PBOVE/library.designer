<template>
  <div :class="$style['wrap']">
    <div class="flex-y-center h-44 pt-7 pb-4 cursor-pointer">
      <div :class="[$style['label'], 'flex-y-center']" :style="{ width: labelWidth }" @click="visible = !visible">
        <icon
          v-if="$slots.overlay"
          type="ant-design:caret-right-filled"
          :rotate="visible ? 90 : 0"
          :class="$style['icon']"
        />
        <div :class="isValue && $style['field-title']">
          <slot name="label">{{ label }}</slot>
        </div>
      </div>
      <div class="flex-1 w-0">
        <slot></slot>
      </div>
    </div>

    <div v-if="$slots.overlay" v-show="visible" :class="$style['overlay']">
      <slot name="overlay"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: String,
    default: '80px'
  },
  isValue: {
    type: Boolean,
    default: false
  }
});

const visible = ref<boolean>(false);
</script>

<style lang="less" module>
.wrap {
  margin: 0 20px;
  border-bottom: 1px solid #f0f0f0;
  color: rgba(0, 0, 0, 0.6);
}

.icon {
  margin-right: 4px;
  font-size: 10px;
}

.label {
  flex-shrink: 0;
  font-size: 12px;
  user-select: none;
}

.overlay {
  padding: 10px 10px 10px 20px;
  margin: 0 -10px 0 -10px;
  background-color: rgba(31, 56, 88, 0.04);

  .wrap {
    margin: 0;
    border-width: 0;
  }
}

.field-title {
  color: #006cff;
}
</style>
