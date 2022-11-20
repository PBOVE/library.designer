<template>
  <a-dropdown v-model:visible="visible" trigger="click">
    <a-input v-model:value="inputColor" class="h-32" placeholder="rgb(255, 255, 255)" @blur="handleInputBlur">
      <template #prefix>
        <div class="color-trigger" :style="{ background: currentColor }"></div>
      </template>
    </a-input>

    <!-- 弹出层 -->
    <template #overlay>
      <div class="b-color-picker__panel">
        <!-- 中间 -->
        <div class="b-color-picker__main">
          <!-- 看板 -->
          <draggable-place
            ref="svpanel"
            class="w-280 h-180 relative mr-10"
            :style="{ background: bgColor }"
            @on-start="handleCursorMove"
            @on-move="handleCursorMove"
          >
            <div class="saturation-white absolute inset-0"></div>
            <div class="saturation-black absolute inset-0"></div>
            <div class="saturation-cursor" :style="cursorStyle">
              <div></div>
            </div>
          </draggable-place>

          <!-- 颜色选择 -->
          <draggable-place
            ref="slider"
            class="color-hue-slider relative"
            @on-start="handleSliderThumbMove"
            @on-move="handleSliderThumbMove"
          >
            <div ref="sliderThumb" class="color-hue-slider-thumb" :style="sliderThumbStyle"></div>
          </draggable-place>
        </div>

        <!-- 透明 -->
        <draggable-place
          ref="alpha"
          class="color-alpha-slider relative"
          @on-start="handleAlphaThumbMove"
          @on-move="handleAlphaThumbMove"
        >
          <div ref="alphaThumb" class="color-alpha-slider-thumb" :style="alphatThumbStyle"></div>
        </draggable-place>

        <!-- 输入框 -->
        <div class="mt-10 flex justify-between">
          <!-- HEX -->
          <a-input v-model:value="inputColorHex" class="px-6 py-4 w-80" @blur="handleInputHexBlur" />

          <div>
            <!-- RGBA -->
            <a-input v-model:value="inputColorRgb.r" class="px-6 py-4 w-36 mr-5" @blur="handleInputRgbBlur" />
            <a-input v-model:value="inputColorRgb.g" class="px-6 py-4 w-36 mr-5" @blur="handleInputRgbBlur" />
            <a-input v-model:value="inputColorRgb.b" class="px-6 py-4 w-36 mr-5" @blur="handleInputRgbBlur" />
            <a-input v-model:value="inputColorRgb.a" class="px-6 py-4 w-36" @blur="handleInputRgbBlur" />
          </div>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { CSSProperties, reactive, computed, ref, watch, nextTick } from 'vue';
import { clamp } from 'lodash';
import tinycolor from 'tinycolor2';

interface Move {
  x: number;
  y: number;
  container: { height: number; width: number };
}

interface Hsla {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Props {
  value?: string;

  defaultValue?: string;
}

const emits = defineEmits(['update:value', 'change']);

const props = withDefaults(defineProps<Props>(), { value: '', defaultValue: '' });

const inputColorRgb = ref<Rgba>({ r: 255, g: 255, b: 255, a: 1 });

const inputColorHex = ref<string>('FFFFFF');

const inputColor = ref<string>();

const currentColor = ref<string>('');

const slider = ref<{ $el: HTMLElement } | null>(null);

const alpha = ref<{ $el: HTMLElement } | null>(null);

const svpanel = ref<{ $el: HTMLElement } | null>(null);

const sliderThumb = ref<HTMLNULL>(null);

const alphaThumb = ref<HTMLNULL>(null);

const cursorStyle = reactive<CSSProperties>({});

const sliderThumbStyle = reactive<CSSProperties>({});

const alphatThumbStyle = reactive<CSSProperties>({});

const visible = ref<boolean>(false);

const hsva = ref<Hsla>({ h: 0, s: 0, v: 0, a: 1 });

const bgColor = computed(() => `hsl(${hsva.value.h}, 100%, 50%)`);

const SVPANEL_SIZE = { w: 280, h: 180 };

const THUMB_SIZE = { w: 4, h: 4 };

function updateInnerColor() {
  inputColor.value = unref(currentColor);

  const color = tinycolor(unref(inputColor));

  inputColorRgb.value = color.toRgb();

  inputColorHex.value = (color.getAlpha() < 1 ? color.toHex8() : color.toHex()).toUpperCase();
}

// 颜色更新
function updateColor(color: Hsla | string) {
  currentColor.value = color ? tinycolor(color).toRgbString() : '';

  emits('update:value', currentColor.value);

  emits('change', currentColor.value);
}

// 获取 饱和度, 明度
function handleCursorMove({ x, y, container: { height, width } }: Move) {
  // 设置偏移
  cursorStyle.left = `${x}px`;
  cursorStyle.top = `${y}px`;

  hsva.value.s = x / width;
  hsva.value.v = clamp(-(y / height) + 1, 0, 1);

  updateColor(hsva.value);
}

// 获取 色相
function handleSliderThumbMove({ y, container: { height } }: Move) {
  sliderThumbStyle.top = `${y}px`;

  if (y < 0) {
    hsva.value.h = 360;
  } else if (y > height) {
    hsva.value.h = 0;
  } else {
    hsva.value.h = (y / height) * 360;
  }

  updateColor(hsva.value);

  updateInnerColor();
}

// 透明的发生变化
function handleAlphaThumbMove({ x, container: { width } }: Move) {
  alphatThumbStyle.left = `${x}px`;

  if (x < 0) {
    hsva.value.a = 0;
  } else if (x > width) {
    hsva.value.a = 1;
  } else {
    hsva.value.a = +(x / width).toFixed(1);
  }

  updateColor(hsva.value);

  updateInnerColor();
}

function getCursorLeft() {
  return SVPANEL_SIZE.w * hsva.value.s;
}

function getCursorTop() {
  return (hsva.value.v - 1) * SVPANEL_SIZE.h * -1;
}

function getThumbTop() {
  if (hsva.value.h === 0) {
    return SVPANEL_SIZE.h;
  }
  if (hsva.value.h === 360) {
    return 0;
  }

  return (hsva.value.h / 360) * SVPANEL_SIZE.h - THUMB_SIZE.h / 2;
}

function getThumbLeft() {
  if (hsva.value.a === 0) {
    return 0;
  }
  if (hsva.value.a === 1) {
    return SVPANEL_SIZE.w;
  }

  return hsva.value.a * SVPANEL_SIZE.w - THUMB_SIZE.w / 2;
}

function update() {
  cursorStyle.top = `${getCursorTop()}px`;
  cursorStyle.left = `${getCursorLeft()}px`;

  sliderThumbStyle.top = `${getThumbTop()}px`;

  alphatThumbStyle.left = `${getThumbLeft()}px`;
}

function updatePosition() {
  const { h, s, v, a } = tinycolor(currentColor.value).toHsv();

  hsva.value = { h, s, v, a };

  update();
}

// 输入失去的值
function handleInputHexBlur() {
  let value = unref(inputColorHex);

  if (/^#?([a-fA-F\d]{6}|[a-fA-F\d]{3})$/.test(value)) {
    // HEX 格式
    value = `#${value.replace('#', '')}`;
  }

  const color = tinycolor(value);

  updateColor(color.toHex8());

  updateInnerColor();

  updatePosition();
}

// 输入失去的值
function handleInputRgbBlur() {
  const color = tinycolor(inputColorRgb.value);

  updateColor(color.toHex8());

  updateInnerColor();

  updatePosition();
}

function handleInputBlur() {
  const color = tinycolor(unref(inputColor));

  updateColor(color.isValid() ? color.toHex8() : '');

  updateInnerColor();

  updatePosition();
}

watch(
  () => visible.value,
  (val) => {
    val && nextTick(updatePosition);
  }
);

watch(
  () => props.value,
  () => {
    const color = props.value || props.defaultValue;

    const value = tinycolor(color).isValid() ? tinycolor(color).toRgbString() : '';

    currentColor.value = value;

    updateInnerColor();

    updatePosition();
  },
  { immediate: true }
);
</script>

<style lang="less">
.color-trigger {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
}

.b-color-picker {
  &__panel {
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  }

  &__main {
    display: flex;
    margin-bottom: 10px;

    .saturation-white {
      background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    }

    .saturation-black {
      background: linear-gradient(to top, #000, transparent);
    }

    .saturation-cursor {
      position: absolute;

      div {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px #0000004d, 0 0 1px 2px #0006;
        transform: translate(-2px, -2px);
      }
    }
  }
}

.color-hue-slider,
.color-alpha-slider {
  width: 12px;
  height: 12px;

  &-thumb {
    position: absolute;
    width: 4px;
    height: 4px;
    border: 1px solid #f0f0f0;
    background: #fff;
    box-shadow: 0 0 2px #0009;
    cursor: pointer;
  }
}

.color-hue-slider {
  height: 180px;
  background: linear-gradient(to bottom, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);

  &-thumb {
    width: 100%;
  }
}

.color-alpha-slider {
  width: 280px;
  background: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
    linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
  background-position: 0 0, 6px 6px;
  background-size: 12px 12px;

  &-thumb {
    height: 100%;
  }
}
</style>
