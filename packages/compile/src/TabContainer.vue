<template>
  <div class="bc-panel-body">
    <div class="bc-panel-head">
      <slot name="head"></slot>
    </div>

    <div class="bc-panel-main">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" module>
.bc-panel-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 0;
}

.bc-panel-main {
  flex: 1;
  height: 0;
}
</style>
