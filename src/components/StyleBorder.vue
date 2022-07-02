<template>
  <action-row label="边框">
    <template #overlay>
      <div class="flex items-center">
        <div class="w-115">
          <div :class="['m-auto', $style['row-item'], $style['selected']]">上</div>
          <div class="flex justify-between my-5">
            <div :class="[$style['row-item'], $style['selected']]">左</div>
            <div :class="[$style['row-item'], $style['selected']]">全部</div>
            <div :class="[$style['row-item'], $style['selected']]">右</div>
          </div>
          <div :class="['m-auto', $style['row-item'], $style['selected']]">下</div>
        </div>

        <div class="flex-1 ml-15">
          <action-row label="宽" label-width="30px">
            <unit-input-number />
          </action-row>
          <action-row label="样式" label-width="30px">
            <global-select class="w-full" :options="options" />
          </action-row>
          <action-row label="宽" label-width="30px">
            <color-picker />
          </action-row>
        </div>
      </div>

      <div class="flex items-center mt-20">
        <div class="w-115 mr-15 relative">
          <div class="flex justify-between">
            <div :class="[$style['row-item'], $style['selected']]">左上</div>
            <div :class="[$style['row-item'], $style['selected']]">右上</div>
          </div>

          <div class="flex justify-between mt-20">
            <div :class="[$style['row-item'], $style['selected']]">左下</div>
            <div :class="[$style['row-item'], $style['selected']]">右下</div>
          </div>

          <div :class="[$style['row-item'], $style['selected'], $style['center-middle']]">全部</div>
        </div>

        <action-row label="圆角" label-width="30px" class="flex-1">
          <unit-input-number />
        </action-row>
      </div>
    </template>
  </action-row>
</template>

<script lang="ts" setup>
// 边框方向
enum BorderDirection {
  top = 'top',

  right = 'right',

  bottom = 'bottom',

  left = 'left',

  all = 'all'
}

const options = [
  { value: 'none', label: '无' },
  { value: 'solid', label: '实线' },
  { value: 'dashed', label: '虚线' },
  { value: 'dotted', label: '点线' }
];

const selectBorderMoudle = ref('');
</script>

<style lang="less" module>
.row-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 28px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &.selected {
    background: #ccc;
  }

  &:hover {
    color: @primary-color;
  }
}

.center-middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
