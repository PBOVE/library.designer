<template>
  <action-row label="边框" label-class="!w-full">
    <template #overlay>
      <div class="flex items-center">
        <!-- 边框 -->
        <div :class="$style['border']">
          <div
            v-for="item in borderOptions"
            :key="item.value"
            :class="{ [$style['row-item']]: true, [$style['selected']]: selectBorder === item.value }"
            @click="handleSelectBorder(item)"
          >
            {{ item.label }}
          </div>
        </div>

        <div class="flex-1">
          <action-row label="宽" label-width="30px" :is-value="inputBorder.width">
            <unit-input-number
              v-model:value="inputBorder.width"
              :options="unitOptions"
              @change="hanldeBorderChange('width')"
            />
          </action-row>
          <action-row label="样式" label-width="30px" :is-value="inputBorder.style">
            <global-select
              v-model:value="inputBorder.style"
              class="w-full"
              :options="styleOptions"
              @change="hanldeBorderChange('style')"
            />
          </action-row>
          <action-row label="颜色" label-width="30px" :is-value="inputBorder.color">
            <b-color-picker v-model:value="inputBorder.color" @change="hanldeBorderChange('color')" />
          </action-row>
        </div>
      </div>

      <a-divider />

      <div class="flex items-center">
        <!-- 圆角 -->
        <div :class="$style['radiu']">
          <div
            v-for="item in radiuOptions"
            :key="item.value"
            :class="{ [$style['row-item']]: true, [$style['selected']]: selectRadiu === item.value }"
            @click="handleSelectRadiu(item)"
          >
            {{ item.label }}
          </div>
        </div>

        <action-row label="圆角" label-width="30px" class="flex-1" :is-value="inputRadiu.width">
          <unit-input-number v-model:value="inputRadiu.width" :options="unitOptions" @change="hanldeRadiuChange" />
        </action-row>
      </div>
    </template>
  </action-row>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';

interface Props {
  value?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), { value: () => ({}) });

const emit = defineEmits(['update:value']);

const styleData = computed({
  get: () => props.value,
  set: (value) => emit('update:value', value)
});

const borderOptions = [
  { label: '上', value: 'top' },
  { label: '左', value: 'left' },
  { label: '全部', value: '' },
  { label: '右', value: 'right' },
  { label: '下', value: 'bottom' }
];

const radiuOptions = [
  { label: '左上', value: 'top-left' },
  { label: '右上', value: 'top-right' },
  { label: '全部', value: '' },
  { label: '左下', value: 'bottom-left' },
  { label: '右下', value: 'bottom-right' }
];

const styleOptions = [
  { value: '', label: '无' },
  { value: 'solid', label: '实线' },
  { value: 'dashed', label: '虚线' },
  { value: 'dotted', label: '点线' }
];

const unitOptions = [
  { label: '更随系统', value: '' },
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'em', value: 'em' }
];

const selectBorder = ref('');

const selectRadiu = ref('');

const inputBorder = ref({ width: '', style: '', color: '' });

const inputRadiu = ref({ width: '' });

function handleSelectBorder({ value }: { value: string }) {
  if (unref(selectBorder) === value) return;

  selectBorder.value = value;

  const selected = unref(selectBorder) ? `-${unref(selectBorder)}-` : '-';

  inputBorder.value.style = styleData.value[`border${selected}style`] || '';

  inputBorder.value.color = styleData.value[`border${selected}color`] || '';

  inputBorder.value.width = styleData.value[`border${selected}width`] || '';
}

function handleSelectRadiu({ value }: { value: string }) {
  if (unref(selectRadiu) === value) return;

  selectRadiu.value = value;

  const selected = unref(selectRadiu) ? `-${unref(selectRadiu)}-` : '-';

  inputRadiu.value.width = styleData.value[`border${selected}radius`] || '';
}

function hanldeBorderChange(type: 'color' | 'style' | 'width') {
  const selected = unref(selectBorder) ? `-${unref(selectBorder)}-` : '-';

  styleData.value[`border${selected}${type}`] = unref(inputBorder)[type];
}

function hanldeRadiuChange() {
  const selected = unref(selectRadiu) ? `-${unref(selectRadiu)}-` : '-';

  styleData.value[`border${selected}radius`] = unref(inputRadiu).width;
}
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
}

.border {
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-template-areas:
    '. a .'
    'b c d'
    '. e .';
}

.radiu {
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-template-areas:
    'a . b'
    '. c .'
    'd . e';
}

.radiu,
.border {
  display: grid;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  margin-right: 15px;

  & > *:nth-of-type(1) {
    grid-area: a;
  }

  & > *:nth-of-type(2) {
    grid-area: b;
  }

  & > *:nth-of-type(3) {
    grid-area: c;
  }

  & > *:nth-of-type(4) {
    grid-area: d;
  }

  & > *:nth-of-type(5) {
    grid-area: e;
  }
}
</style>
