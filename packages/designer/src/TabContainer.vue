<template>
  <div :class="$style['wrap']">
    <slot></slot>

    <div class="flex-1 h-0">
      <slot name="scrollClint"></slot>
    </div>
  </div>
</template>

<style lang="less" module>
.wrap {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 0;
}
</style>
